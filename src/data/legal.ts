function envValue(value: string | undefined) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

const legalName = envValue(process.env.NEXT_PUBLIC_OPERATOR_LEGAL_NAME);
const inn = envValue(process.env.NEXT_PUBLIC_OPERATOR_INN);
const ogrn = envValue(process.env.NEXT_PUBLIC_OPERATOR_OGRN);
const postalAddress = envValue(process.env.NEXT_PUBLIC_OPERATOR_POSTAL_ADDRESS);
const privacyEmail = envValue(process.env.NEXT_PUBLIC_PRIVACY_EMAIL);
const phone = envValue(process.env.NEXT_PUBLIC_OPERATOR_PHONE);
const metricaId = envValue(process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID);

export const legal = {
  effectiveDate: "22 ноября 2026 г.",
  operator: {
    legalName,
    inn,
    ogrn,
    postalAddress,
    privacyEmail,
    phone,
  },
  metrica: {
    id: metricaId && /^\d+$/.test(metricaId) ? metricaId : null,
  },
  missingOperatorDetails: [
    !legalName && "полное наименование ИП или ООО",
    !inn && "ИНН",
    !postalAddress && "почтовый адрес для обращений",
    !privacyEmail && "email для обращений по персональным данным",
  ].filter(Boolean) as string[],
};

export function legalValue(value: string | null, fallback: string) {
  return value ?? fallback;
}
