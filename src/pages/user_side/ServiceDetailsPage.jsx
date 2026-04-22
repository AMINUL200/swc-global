import React from "react";
import ServiceFeature from "../../component/service/ServiceFeature";
import ServiceHero from "../../component/service/ServiceHero";
import ServiceWhatWeOffer from "../../component/service/ServiceWhatWeOffer";
import ServiceFAQ from "../../component/service/ServiceFAQ";

const ServiceDetailsPage = () => {
  return (
    <div>
      {/* Hero Section */}
      <ServiceHero />

      {/* Service Feature */}
      <ServiceFeature />

      {/* Service What We Offer */}
      <ServiceWhatWeOffer />

      {/* Service FAQ */}
      <ServiceFAQ />
    </div>
  );
};

export default ServiceDetailsPage;
