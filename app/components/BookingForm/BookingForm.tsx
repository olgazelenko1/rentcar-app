'use client';

import { useState } from 'react';
import styles from './BookingForm.module.css';

export default function BookingForm({ carId }: { carId: string }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const [coments, setComents] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Якщо API має ендпоінт бронювання — зробіть POST сюди.
      // await api.post('/bookings', { carId, name, email, ... })
      await new Promise((r) => setTimeout(r, 800)); // симуляція

      // Використовуємо carId, щоб уникнути помилки "defined but never used"
      console.log('Booking data:', {
        carId,
        name,
        email,
        bookingDate,
        coments,
      });

      setSuccess('Booking successful!');
    } catch (err) {
      console.error(err);
      setSuccess('Booking failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.title}>Book this car</h2>

      <input
        className={styles.input}
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
      />

      <input
        className={styles.input}
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />

      <input
        className={styles.input}
        type="date"
        value={bookingDate}
        onChange={(e) => setBookingDate(e.target.value)}
        placeholder="Booking Date"
        required
      />

      <textarea
        className={styles.textarea}
        value={coments}
        onChange={(e) => setComents(e.target.value)}
        placeholder="Comments"
      />

      <button className={styles.button} type="submit" disabled={loading}>
        {loading ? 'Booking...' : 'Book Now'}
      </button>

      {success && <p className={styles.success}>{success}</p>}
    </form>
  );
}
