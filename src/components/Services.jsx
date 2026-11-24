import React from 'react';
import { services } from '../data/portfolioData';

export default function Services() {
  return (
    <section id="services" className="section-padding">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">Design Services</div>
          <h2 className="section-title">
            Comprehensive <i>Interior Solutions</i>
          </h2>
          <p className="section-subtitle">
            From initial spatial blueprints and material schedules to photorealistic CGI visualization, each service is executed with architectural rigor and aesthetic elegance.
          </p>
        </div>

        <div className="services-grid">
          {services.map((service, index) => (
            <div key={service.id} className="service-card">
              <div className="service-img-wrapper">
                <img
                  src={service.image}
                  alt={service.title}
                  className="service-img"
                  loading="lazy"
                />
                <span className="service-number">0{index + 1}</span>
              </div>

              <div className="service-body">
                <h3 className="service-title">{service.title}</h3>
                <p className="service-desc">{service.description}</p>

                <div className="service-deliverables">
                  {service.deliverables.map((item, idx) => (
                    <span key={idx} className="deliverable-tag">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
