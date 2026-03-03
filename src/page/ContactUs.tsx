import ContactForm from "../components/ContactUs/ContactForm";

function ContactUS() {
  return (
    <div className="mb-5">
      <div className="relative bg-center bg-cover bg-[url('/ContactUs/87b06d3f65b1a49829ed6ac22ce1bc45_1522x570-q-85.jpg')] rounded-3xl max-w-312.5 h-100">
        <div className="w-full h-full flex flex-col justify-center text-white gap-2">
          <p className="text-2xl font-bold">Get In Touch</p>
          <p className="text-5xl font-bold">Contact us</p>
        </div>
      </div>
      <div>
        <ContactForm />
      </div>
    </div>
  );
}

export default ContactUS;
