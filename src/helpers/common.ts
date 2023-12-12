// export function getCookie(key: string | null = null): string | null {
//   if (typeof document === 'undefined') {
//     return null;
//   }

//   const cookies = document.cookie;

//   if (!cookies) {
//     return null;
//   }

//   const records = cookies.split(/;\s+/);
//   const formattedRecords: Record<string, string> = records.reduce((carry, record) => {
//     const [cookieKey, value] = record.split('=');
//     try {
//       carry[cookieKey] = JSON.parse(value) || value;
//     } catch {
//       carry[cookieKey] = value;
//     }

//     return carry;
//   }, {} as Record<string, string>);

//   if (!key) {
//     return formattedRecords;
//   }

//   return formattedRecords[key] || null;
// }

// export function setCookie(key: string, value: string, expires: number = 99999, path: string = '/'): void {
//   document.cookie = `${key}=${value}; expires=${expires}; path=${path};`;
// }

// export function deleteCookie(key: string, path: string = '/'): void {
//   document.cookie = `${key}=; expires=; path=${path};`;
// }

export function getCookie(key: string | null = null): string | object | null {
  if (typeof document === 'undefined') {
    return null;
  }

  const cookies = document.cookie;

  if (!cookies) {
    return null;
  }

  const records = cookies.split(/;\s+/);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const formattedRecords = records.reduce((carry: { [key: string]: any }, record: string) => {
    const [k, v] = record.split('=');
    try {
      carry[k] = JSON.parse(v) || v;
    } catch {
      carry[k] = v;
    }

    return carry;
  }, {});

  if (!key) {
    return formattedRecords;
  }

  return formattedRecords[key] || null;
}

export function setCookie(key: string, value: string, expires: number = 99999, path: string = '/'): void {
  document.cookie = `${key}=${value}; expires=${expires}; path=${path};`;
}

export function deleteCookie(key: string, path: string = '/'): void {
  document.cookie = `${key}=; expires=; path=${path};`;
}
