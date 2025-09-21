const ipv4Part = '(?:25[0-5]|2[0-4]\\d|1\\d{2}|[1-9]?\\d)';
const ipv4FourOctet = new RegExp(`^${ipv4Part}\\.${ipv4Part}\\.${ipv4Part}\\.${ipv4Part}$`);

const ipv6Part = '(?:[0-9a-f]+::?)+';
const ipv6Native = new RegExp(`^(::)?(${ipv6Part})?([0-9a-f]+)?(::)?$`, 'i');
const ipv6Transitional = new RegExp(`^((?:${ipv6Part})|(?:::)(?:${ipv6Part})?)${ipv4Part}\\.${ipv4Part}\\.${ipv4Part}\\.${ipv4Part}$`, 'i');

export function isIPv4(input: string): boolean {
  if (!input) return false;
  return ipv4FourOctet.test(input);
}

export function isIPv6(input: string): boolean {
  if (!input.includes(':')) return false;
  return ipv6Native.test(input) || ipv6Transitional.test(input);
}


