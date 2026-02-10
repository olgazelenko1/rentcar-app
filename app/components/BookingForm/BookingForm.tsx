'use client';

import { useState } from 'react';
import styles from './BookingForm.module.css';

interface BookingFormProps {
  carId: string;
}

export default function BookingForm({ carId }: BookingFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const [comments, setComments] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    try {
      const bookingData = {
        carId,
        name,
        email,
        bookingDate,
        comments,
      };

      console.log('Booking data:', bookingData);

      await new Promise((r) => setTimeout(r, 800));

      setMessage('Booking successful! We will contact you soon.');
      setName('');
      setEmail('');
      setBookingDate('');
      setComments('');
    } catch {
      setError('Booking failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.header}>
        <h2 className={styles.title}>Book This Car</h2>
        <p className={styles.subtitle}>
          Fill out the form and we&apos;ll get back to you shortly
        </p>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor="name">
            Full Name *
          </label>
          <input
            id="name"
            className={styles.input}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your full name"
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor="email">
            Email Address *
          </label>
          <input
            id="email"
            className={styles.input}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your.email@example.com"
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor="bookingDate">
            Rental Date *
          </label>
          <input
            id="bookingDate"
            className={styles.input}
            type="date"
            value={bookingDate}
            onChange={(e) => setBookingDate(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor="comments">
            Additional Comments
          </label>
          <textarea
            id="comments"
            className={styles.textarea}
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            placeholder="Any special requests or questions?"
            rows={4}
          />
        </div>

        <button className={styles.button} type="submit" disabled={loading}>
          {loading ? (
            <>
              <span className={styles.spinner}></span>
              Processing...
            </>
          ) : (
            <>
              <span className={styles.buttonIcon}>🚗</span>
              Book Now
            </>
          )}
        </button>

        {message && (
          <div className={styles.successMessage}>
            <span className={styles.successIcon}>✓</span>
            {message}
          </div>
        )}

        {error && (
          <div className={styles.errorMessage}>
            <span className={styles.errorIcon}>✗</span>
            {error}
          </div>
        )}
      </form>
    </div>
  );
}
