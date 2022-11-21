export const currencyFormatter = (value: number, currency = "USD") => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(value);
}

export const percentageFormatter = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 2
  }).format(value);
}

export const compactCurrencyFormatter = (value: number, currency = "USD") => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    notation: 'compact',
    currencySign: "accounting",
    minimumFractionDigits: 2
  }).format(value);
}


export const dateFormatter = (value: string | number, options?: Intl.DateTimeFormatOptions) => {
  const defaultOptions = { dateStyle: "long", timeStyle: "short" } as const
  return new Intl.DateTimeFormat('en-US', options || defaultOptions).format(new Date(value));
}