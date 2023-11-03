'use client'

import { useState } from 'react'
import { send } from '@emailjs/browser';

const SERVICE_ID = process.env.NEXT_PUBLIC_SERVICE_ID;
const TEMPLATE_ID = process.env.NEXT_PUBLIC_TEMPLATE_ID;
const USER_ID = process.env.NEXT_PUBLIC_USER_ID;


export default function ContactPage() {
    const [toSend, setToSend] = useState({
        name: '',
        email: '',
        message: '',
    });

    const [sent, setSent] = useState<boolean | string>(false);

    async function handleSubmit(e: { preventDefault: () => void; }) {
        e.preventDefault();
        try {
            const data = {
                from_name: toSend.name,
                user_email: toSend.email,
                message: toSend.message,
            }

            send(`${SERVICE_ID}`, `${TEMPLATE_ID}`, data, `${USER_ID}`)
                .then((response) => {
                    // alert('message sent, thank you so much');
                    setToSend({ name: '', email: '', message: '' });
                    setSent('mensaje enviado!!! Muchas gracias por contactarte');
                })
                .catch((err) => {
                    alert('disculpas, hubo un error al enviar el formulario');
                    console.log(err);
                });
        } catch (e) {
            console.log(`${e}`);
        }
    }


    function handleChange(e: React.ChangeEvent<HTMLFormElement>) {
        setToSend({ ...toSend, [e.target.name]: e.target.value });
    }

    return (
        <section className="contact-me">
            <h1>Contacto</h1>
            <div>
                {sent ? (
                    <div className="alert">
                        {sent}
                    </div>
                ) : (
                    <form
                        name="contact-form"
                        onSubmit={handleSubmit}
                        onChange={handleChange}
                        className="contact-form"
                    >
                        <label htmlFor="name">Nombre:</label>
                        <input type="text" id="name" name="name" required/>

                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" />

                        <label htmlFor="message">Mensaje:</label>
                        <textarea id="message" name="message" required ></textarea>
                        <button type="submit">Enviar</button>
                    </form>
                )}

            </div>
        </section>
    )
}