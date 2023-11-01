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

            // setSent('mensaje enviado!!! Muchas gracias por contactarte');
            // return;

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

    // function handleChange(e) {
    //     setToSend({ ...toSend, [e.target.name]: e.target.value });
    // }
    function handleChange(e: React.ChangeEvent<HTMLFormElement>) {
        setToSend({ ...toSend, [e.target.name]: e.target.value });
    }

    return (
        <section className="">
            <div>
                <h2>Contacto</h2>
                {sent ? (
                    <div>
                        {sent}
                    </div>
                ) : (
                    <form
                        name="contact"
                        onSubmit={handleSubmit}
                        onChange={handleChange}
                    >
                        <label htmlFor="name" style={styles.label}>Nombre:</label>
                        <input type="text" id="name" name="name" required/>

                        <label htmlFor="email" style={styles.label}>Email:</label>
                        <input type="email" id="email" name="email" required />

                        <label htmlFor="message" style={styles.label}>Mensaje:</label>
                        <textarea id="message" name="message" required ></textarea>
                        <button type="submit" style={styles.button}>Enviar</button>
                    </form>
                )}

            </div>
        </section>
    )
}

const styles = {

    alert: {
        padding: '10px',
        backgroundColor: '#d4edda',
        color: '#155724',
        marginBottom: '20px',
        textAlign: 'center',
        borderRadius: '4px',
        border: '1px solid #c3e6cb'
    },
    contactForm: {
        margin: '0 auto',
        padding: '2em',
        borderRadius: '5px',
        maxWidth: '500px',
        width: '100%'
    },
    label: {
        display: 'block',
        marginBottom: '5px'
    },
    input: {
        width: '100%',
        padding: '10px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        marginBottom: '10px',
        fontSize: '15px',
    },
    textarea: {
        width: '100%',
        padding: '10px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        marginBottom: '10px',
        fontSize: '15px',
    },
    button: {
        width: '100%',
        padding: '10px',
        borderRadius: '4px',
        border: 'none',
        backgroundColor: '#007bff',
        color: '#fff',
        cursor: 'pointer',
        transition: 'background-color 0.3s'
    }
}

