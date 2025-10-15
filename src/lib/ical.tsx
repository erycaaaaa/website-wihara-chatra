export function makeICS(event: { uid:string; title:string; start:Date; end:Date; location?:string; }){
  const fmt = (d: Date) => d.toISOString().replace(/[-:]/g,'').split('.')[0] + 'Z';
  const lines = [
    'BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Chatra Dhammapanno//ID',
    'BEGIN:VEVENT',`UID:${event.uid}`,`DTSTAMP:${fmt(new Date())}`,
    `DTSTART:${fmt(event.start)}`,`DTEND:${fmt(event.end)}`,
    `SUMMARY:${event.title}`, event.location ? `LOCATION:${event.location}` : '',
    'END:VEVENT','END:VCALENDAR'
  ].filter(Boolean);
  return lines.join('\r\n');
}
