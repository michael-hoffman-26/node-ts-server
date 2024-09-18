export function formatGithubUrl(urlInput){
    const url = new URL(urlInput);
    const baseUrl = `${url.origin}${url.pathname}`;


    const queryParam = url.searchParams.get('q') || '';
    const encodedQuery = encodeURIComponent(queryParam);

    const requestUrl = `${baseUrl}?q=${encodedQuery}`;

    return requestUrl
}