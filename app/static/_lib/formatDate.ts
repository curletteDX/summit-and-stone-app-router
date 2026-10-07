const longDate = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "UTC",
});

/** Formats an ISO date such as "2026-09-14" as "September 14, 2026". */
export const formatDate = (isoDate: string) => longDate.format(new Date(isoDate));
