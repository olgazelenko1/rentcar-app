export default function CarDetailsPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1>Car Details</h1>
      <p>Car ID: {params.id}</p>
    </div>
  );
}
