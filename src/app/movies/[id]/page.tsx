import { MovieDetails } from "#/widgets/movies/ui/MovieDetails";

export default async function MoviePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return <MovieDetails id={Number(id)} />;
}