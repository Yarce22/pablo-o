export type CfLink = {
  sys: { type: 'Link'; linkType: 'Asset' | 'Entry'; id: string };
};

export interface CfAsset {
  sys: { id: string; type: 'Asset' };
  fields: { title: string; file: { url: string; contentType: string } };
}

export interface CfEntry<T> {
  sys: { id: string; type: 'Entry'; contentType: { sys: { id: string } } };
  fields: T;
}

export interface CfResponse<T> {
  items: CfEntry<T>[];
  total: number;
  includes?: {
    Asset?: CfAsset[];
    Entry?: CfEntry<Record<string, unknown>>[];
  };
}

export function resolveAsset(
  link: CfLink | undefined,
  includes: CfResponse<unknown>['includes'],
): string | null {
  if (!link || !includes?.Asset) return null;
  const asset = includes.Asset.find((a) => a.sys.id === link.sys.id);
  if (!asset) return null;
  const url = asset.fields.file.url;
  return url.startsWith('//') ? `https:${url}` : url;
}

export function resolveEntry<T>(
  link: CfLink | undefined,
  includes: CfResponse<unknown>['includes'],
): CfEntry<T> | null {
  if (!link || !includes?.Entry) return null;
  const entry = includes.Entry.find((e) => e.sys.id === link.sys.id);
  return (entry as CfEntry<T>) ?? null;
}

export async function cfFetch<T>(
  contentType: string,
  params: Record<string, string> = {},
): Promise<CfResponse<T>> {
  const spaceId = process.env.CONTENTFUL_SPACE_ID;
  const token = process.env.CONTENTFUL_ACCESS_TOKEN;

  const url = new URL(
    `https://cdn.contentful.com/spaces/${spaceId}/entries`,
  );
  url.searchParams.set('access_token', token!);
  url.searchParams.set('content_type', contentType);
  url.searchParams.set('include', '2');
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);

  const res = await fetch(url.toString(), { next: { revalidate: 60 } });
  if (!res.ok) {
    throw new Error(
      `Contentful fetch failed for "${contentType}": ${res.status}`,
    );
  }
  return res.json() as Promise<CfResponse<T>>;
}
