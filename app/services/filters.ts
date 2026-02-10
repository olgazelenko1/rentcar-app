export const parseFilters = (
  params: Record<string, string | undefined>
): Record<string, string | number | boolean> => {
  const filters: Record<string, string | number | boolean> = {};
  if (params.brand) filters.brand = params.brand;
  if (params.price) filters.price = params.price;
  if (params.mileageFrom) filters.mileageFrom = Number(params.mileageFrom);
  if (params.mileageTo) filters.mileageTo = Number(params.mileageTo);
  return filters;
};

export const buildQueryString = (
  filters: Record<string, string | number | boolean>
): string => {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      params.set(key, String(value));
    }
  });
  return params.toString();
};
