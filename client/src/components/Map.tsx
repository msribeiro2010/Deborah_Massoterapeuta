const Map = () => {
  return (
    <section className="h-[400px] bg-gray-200">
      <div className="w-full h-full flex items-center justify-center bg-gray-200">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3682.4059834593733!2d-47.154997223741805!3d-22.642407331786537!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94c8990cbf1d7ac1%3A0x855a46d19e409fb1!2sR.%20Salvador%20Lombardi%20Neto%2C%20260%20-%20Centro%2C%20Paul%C3%ADnia%20-%20SP%2C%2013140-000!5e0!3m2!1spt-BR!2sbr!4v1716577175741!5m2!1spt-BR!2sbr"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Location Map"
        ></iframe>
      </div>
    </section>
  );
};

export default Map;
