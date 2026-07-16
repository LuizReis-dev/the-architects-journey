import { useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";
import { useI18n } from "../../i18n/i18n";
import StageLayout from "../../layouts/stage-layout/StageLayout";
import { professor } from "../../shared/characters";
import { PixelSprite } from "../../shared/pixel-sprite";
import "./NotFound.css";

export default function NotFound() {
  const navigate = useNavigate();
  const { t } = useI18n();

  return (
    <StageLayout>
      <section className="screen not-found-screen">
        <div className="logo not-found-logo">
          <h1>{t.notFound.code}</h1>
        </div>

        <div className="gb-window not-found-panel">
          <div className="dialogue not-found-dialogue">
            <div className="who">
              <PixelSprite character={professor} scale={4} />
            </div>
            <p>
              <span className="name-tag">{t.notFound.dialogueName}</span>
              {t.notFound.dialogue}
              <span className="caret" />
            </p>
          </div>

          <Button type="button" onClick={() => navigate("/")}>
            {t.notFound.backToLogin}
          </Button>
        </div>
      </section>
    </StageLayout>
  );
}
