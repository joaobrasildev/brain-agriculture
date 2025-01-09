import { EDocumentType } from '../../enum/producer.enum';
import { documentValidator } from '../document-validator.helper';

describe('CreateAgriculturalCropService', () => {
  it('should be return true when sended valid CNPJ document', async () => {
    const documentId = '33295457000120';
    const documentType = EDocumentType.CNPJ;
    const isValidDocument = documentValidator(documentType, documentId);

    expect(isValidDocument).toBeTruthy();
  });

  it('should be return true when sended valid CPF document', async () => {
    const documentId = '96530194061';
    const documentType = EDocumentType.CPF;
    const isValidDocument = documentValidator(documentType, documentId);

    expect(isValidDocument).toBeTruthy();
  });

  it('should be return false when sended invalid CNPJ document', async () => {
    const documentId = '33295457000129';
    const documentType = EDocumentType.CNPJ;
    const isValidDocument = documentValidator(documentType, documentId);

    expect(isValidDocument).toBeFalsy();
  });

  it('should be return false when sended invalid CPF document', async () => {
    const documentId = '96530194069';
    const documentType = EDocumentType.CPF;
    const isValidDocument = documentValidator(documentType, documentId);

    expect(isValidDocument).toBeFalsy();
  });
});
