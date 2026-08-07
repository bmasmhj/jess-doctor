import { google } from "googleapis";

export type DayAvailability = { date: string; available: boolean };

function getAuth() {
  const rawKey = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
  if (!rawKey) return null;

  const credentials = JSON.parse(rawKey);
  return new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/calendar.readonly"],
  });
}

/**
 * Any day containing a calendar event is busy/unavailable; every other day
 * in the window defaults to available. Returns [] (caller should treat as
 * "unknown/unconfigured") when service account credentials aren't set yet.
 */
export async function getAvailability(days = 90): Promise<DayAvailability[]> {
  const calendarId = process.env.GOOGLE_CALENDAR_ID;
  const auth = getAuth();
  if (!auth || !calendarId) return [];

  const calendar = google.calendar({ version: "v3", auth });

  const timeMin = new Date();
  timeMin.setHours(0, 0, 0, 0);
  const timeMax = new Date(timeMin);
  timeMax.setDate(timeMax.getDate() + days);

  const res = await calendar.freebusy.query({
    requestBody: {
      timeMin: timeMin.toISOString(),
      timeMax: timeMax.toISOString(),
      items: [{ id: calendarId }],
    },
  });

  const busyRanges = res.data.calendars?.[calendarId]?.busy ?? [];
  const busyDates = new Set<string>();
  for (const range of busyRanges) {
    if (!range.start || !range.end) continue;
    const start = new Date(range.start);
    const end = new Date(range.end);
    const cursor = new Date(start);
    cursor.setHours(0, 0, 0, 0);
    while (cursor < end) {
      busyDates.add(cursor.toISOString().slice(0, 10));
      cursor.setDate(cursor.getDate() + 1);
    }
  }

  const result: DayAvailability[] = [];
  const cursor = new Date(timeMin);
  for (let i = 0; i < days; i++) {
    const dateStr = cursor.toISOString().slice(0, 10);
    result.push({ date: dateStr, available: !busyDates.has(dateStr) });
    cursor.setDate(cursor.getDate() + 1);
  }

  return result;
}
