export const cleanPost = (post: string): string => {
  return post
    .replace(/<!-- .* -->/g, '')
    .replace(/&lt;!-- .* --&gt;/g, '')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&');
};
