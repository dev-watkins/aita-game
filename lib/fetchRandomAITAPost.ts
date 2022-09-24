export const fetchRandomAITAPost = async (url?: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_HOST || 'http://localhost:3000'}/api/post/`
  );
  if (!response.ok) return {};
  const data = await response.json();

  return data;
};
