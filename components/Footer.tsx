export default function Footer({
  siteName,
  contactEmail,
  linkedinUrl,
}: {
  siteName: string;
  contactEmail: string;
  linkedinUrl: string;
}) {
  return (
    <footer className="border-t border-line/60 py-10">
      <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-4 px-6 text-sm text-ink/60 sm:flex-row sm:items-center">
        <p>© {new Date().getFullYear()} {siteName}. Oral Health Therapist.</p>
        <div className="flex gap-5">
          <a href={`mailto:${contactEmail}`} className="hover:text-teal-deep">
            {contactEmail}
          </a>
          <a href={linkedinUrl} className="hover:text-teal-deep">
            LinkedIn
          </a>
          <a href="/admin/login" className="hover:text-teal-deep">
            Admin
          </a>
        </div>
      </div>
    </footer>
  );
}
