export function formatReaders(count: number): string {
  if (count >= 100000) return `${(count / 1000).toFixed(0)}K`;
  if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
  return String(count);
}

export function formatThaiDate(iso: string): string {
  const date = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return iso;
  return new Intl.DateTimeFormat("th-TH", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Bangkok",
  }).format(date);
}

export function formatRelative(iso: string): string {
  const date = new Date(`${iso}T00:00:00Z`).getTime();
  if (Number.isNaN(date)) return iso;
  const days = Math.round((Date.now() - date) / 86_400_000);
  if (days <= 0) return "วันนี้";
  if (days === 1) return "เมื่อวาน";
  if (days < 7) return `${days} วันก่อน`;
  if (days < 30) return `${Math.floor(days / 7)} สัปดาห์ก่อน`;
  return formatThaiDate(iso);
}
