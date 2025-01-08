import { EDocumentType } from '../enum/producer.enum';

export function documentValidator(
  documentType: EDocumentType,
  documentId: string,
): boolean {
  const sanitizedId = documentId.replace(/\D/g, '');
  if (documentType === EDocumentType.CPF) {
    return validateCPF(sanitizedId);
  } else if (documentType === EDocumentType.CNPJ) {
    return validateCNPJ(sanitizedId);
  }

  return false;
}

function validateCPF(cpf: string): boolean {
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

  const calculateDigit = (cpf: string, factor: number): number => {
    const sum = cpf
      .slice(0, factor - 1)
      .split('')
      .reduce((acc, num, index) => acc + parseInt(num) * (factor - index), 0);
    const rest = (sum * 10) % 11;
    return rest === 10 ? 0 : rest;
  };

  return (
    calculateDigit(cpf, 10) === parseInt(cpf[9]) &&
    calculateDigit(cpf, 11) === parseInt(cpf[10])
  );
}

function validateCNPJ(cnpj: string): boolean {
  if (cnpj.length !== 14 || /^(\d)\1+$/.test(cnpj)) return false;

  const calculateDigit = (cnpj: string, factors: number[]): number => {
    const numbers = cnpj.slice(0, factors.length);
    let sum = 0;

    for (let i = 0; i < factors.length; i++) {
      sum += parseInt(numbers[i]) * factors[i];
    }

    const rest = sum % 11;
    return rest < 2 ? 0 : 11 - rest;
  };

  const factors1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const factors2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

  const digit1 = calculateDigit(cnpj, factors1);
  const digit2 = calculateDigit(cnpj, factors2);

  return digit1 === parseInt(cnpj[12]) && digit2 === parseInt(cnpj[13]);
}
