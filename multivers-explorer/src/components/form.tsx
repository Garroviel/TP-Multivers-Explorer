import { useRef, useState } from 'react';
import { useFormik } from 'formik';
import { z } from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import type { ReviewFormValues } from '../types/FormType';
// schémas du formulaire voir formType
const reviewSchema = z.object({
  reviewerName: z
    .string()
    .min(3, "Le nom de l'évaluateur doit contenir au moins 3 caractères."),
  email: z.email('Veuillez saisir une adresse email valide.'),
  rating: z
    .number({
      error: 'La note est obligatoire.',
    })
    .min(1, 'La note doit être comprise entre 1 et 5.')
    .max(5, 'La note doit être comprise entre 1 et 5.'),
  comment: z
    .string()
    .max(200, 'Le commentaire ne doit pas dépasser 200 caractères.')
    .optional()
    .or(z.literal('')), // accepte vide
});

function ReviewForm() {
  const dialogRef = useRef<HTMLDialogElement | null>(null); // utilise pour accéeder à l'élément dialog du DOM
  const [submittedReview, setSubmittedReview] = useState<ReviewFormValues | null>(null); // const save données

  const formik = useFormik<ReviewFormValues>({
    initialValues: {
      reviewerName: '',
      email: '',
      rating: '',
      comment: '',
    },
    validationSchema: toFormikValidationSchema(reviewSchema), // Validation du schéma
    onSubmit: (values, { resetForm }) => {
      setSubmittedReview(values);	// save des données
      dialogRef.current?.showModal();	// appelle modal - ouvrir modal
      resetForm();
    },
  });

  return (
    <section style={{ marginTop: '2rem' }}>
      <h2>Laisser une note sur ce personnage</h2>

      <form onSubmit={formik.handleSubmit} noValidate>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="reviewerName">Nom de l'évaluateur</label>
          <br />
          <input
            id="reviewerName"
            name="reviewerName"
            type="text"
            value={formik.values.reviewerName}
			// mettre à jour à chaque frappe
            onChange={formik.handleChange}
			// A-t-on interrgie avec le champ
            onBlur={formik.handleBlur}
          />
          {formik.touched.reviewerName && formik.errors.reviewerName && (
            <p style={{ color: 'red' }}>{formik.errors.reviewerName}</p>
          )}
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="email">Email</label>
          <br />
          <input
            id="email"
            name="email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email && (
            <p style={{ color: 'red' }}>{formik.errors.email}</p>
          )}
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="rating">Note (entre 1 et 5)</label>
          <br />
          <input
            id="rating"
            name="rating"
            type="number"
            min="1"
            max="5"
            value={formik.values.rating}
            onChange={(event) => {
              const value = event.target.value;
              formik.setFieldValue('rating', value === '' ? '' : Number(value)); // Parce que pour un input type="number", la valeur reçue depuis l’input reste une chaîne de caractères.
			  // Zod attend un number donc champ vide → '' sinon → Number(value)
            }}
            onBlur={formik.handleBlur}
          />
          {formik.touched.rating && formik.errors.rating && (
            <p style={{ color: 'red' }}>{formik.errors.rating}</p>	// affiche l'erreur seulement si touché blur
          )}
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="comment">Commentaire</label>
          <br />
          <textarea
            id="comment"
            name="comment"
            rows={4}
            value={formik.values.comment}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.comment && formik.errors.comment && (
            <p style={{ color: 'red' }}>{formik.errors.comment}</p>
          )}
        </div>

        <button type="submit">Valider</button>
      </form>

      <dialog ref={dialogRef}>
        <h3>Évaluation enregistrée</h3>

        {submittedReview && (
          <div>
            <p>
              <strong>Nom :</strong> {submittedReview.reviewerName}
            </p>
            <p>
              <strong>Email :</strong> {submittedReview.email}
            </p>
            <p>
              <strong>Note :</strong> {submittedReview.rating}
            </p>
            <p>
              <strong>Commentaire :</strong>{' '}
              {submittedReview.comment || 'Aucun commentaire'}
            </p>
          </div>
        )}

        <button onClick={() => dialogRef.current?.close()}>Fermer</button>
      </dialog>
    </section>
  );
}

export default ReviewForm;