import { Wordmark } from "@/components/brand/Wordmark";

/**
 * Loader (≈ 0,9 s) : une goutte tombe, le logo apparaît, une onde se propage.
 * Affiché uniquement à la première arrivée sur l'accueil pendant la session
 * (classe html.first-visit posée par le script d'initialisation).
 */
export function Loader() {
  return (
    <div className="loader" aria-hidden="true">
      <div className="loader-inner">
        <span className="loader-drop" />
        <Wordmark className="loader-mark" />
        <span className="loader-ripple" />
      </div>
    </div>
  );
}
