export function OrgJsonLd(){
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
      "@context":"https://schema.org",
      "@type":"Organization",
      name:"Chatra Dhammapanno",
      url:"https://chatradhammapanno.org",
      logo:"/logo.svg"
    })}} />
  );
}
