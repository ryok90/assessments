export const env = {
  port: +(process.env.PORT ?? 12345),
  limit: +(process.env.SUGGESTION_NUMBER ?? 10),
};
