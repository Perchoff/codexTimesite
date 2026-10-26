import Link from "next/link";
import { Brand } from "./Brand";
import { CookieSettingsButton } from "./PrivacyControls";
import { contacts } from "@/data/contacts";

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <Brand footer />
          <p>
            Твой идеальный момент.
            <br />
            <span>С заботой о красоте в деталях.</span>
          </p>
          <span className="footer-slogan">Удели время себе</span>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Время маникюра</span>
          <div>
            <Link href="/privacy">Политика конфиденциальности</Link>
            <CookieSettingsButton />
          </div>
          <a href={contacts.phoneHref}>{contacts.phone}</a>
        </div>
      </div>
    </footer>
  );
}
