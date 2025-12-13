export interface Operation {
  id: number;
  operationDate: string;
  groupId: number;
  shiftId: number;
  productionLineId: number;
  temperature: number;
  weight: number;
  quality: 'OK' | 'NOT_OK';
  inputMethod: 'MANUAL' | 'OCR';
  isActive: boolean;
  group?: {
    id: number;
    name: string;
  };
  shift?: {
    id: number;
    shiftNumber: number;
  };
  productionLine?: {
    id: number;
    lineCode: string;
  };
  createdAt?: string;
  updatedAt?: string;
}

export interface OperationInput {
  operation_date: string;
  group_id: number;
  shift_id: number;
  production_line_id: number;
  temperature: number;
  weight: number;
  quality: 'OK' | 'NOT_OK';
  input_method?: 'MANUAL' | 'OCR';
}