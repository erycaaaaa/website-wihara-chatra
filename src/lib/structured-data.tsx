export function EventJsonLd(props: { name: string; startDate: string; endDate?: string; url: string; location?: {name?:string; address?:string} }){
  const data = {
    "@context":"https://schema.org","@type":"Event",
    name: props.name,
    startDate: props.startDate,
    endDate: props.endDate || props.startDate,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    url: props.url,
    location: {
      "@type":"Place",
      name: props.location?.name || "Chatra Dhammapanno",
      address: props.location?.address || "Indonesia"
    },
    organizer: {"@type":"Organization", name:"Chatra Dhammapanno"}
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(data)}} />;
}
