const emailRegex = new RegExp("[a-z0-9]+@[a-z]+\.[a-z]{2,3}");

enum availableDomains {
    gmail = "com",
    proton = "me",
    protonmail = "com",
    outlook = "es com",
    hotmail = "com",
    yahoo = "com"
}

export function emailVerified(email: string) {
  if (!email) return false;
  if (email.length > 254) return false;
  const isValid = emailRegex.test(email);
  if (!isValid) return false;
  const parts = email.split("@");
  if (parts[0].length > 64) return false;
  const domainParts = parts[1].split(".");
  if (domainParts.some(function(part) {
    return part.length > 63;
  })) return false;

  // @ts-ignore
  const extensions = availableDomains[domainParts[0]];
  if (!extensions) return false;

  return extensions.split(" ").includes(domainParts[1]);
}
