export interface IDbCrud<T> {
  create(createDtos: any): Promise<T>;
  find(): Promise<T[]>;
  findOne(filter: any): Promise<T>;
  findById(id: string): Promise<T>;
  findByIdAndUpdate(id: string, updateDto: any): Promise<T>;
  findByIdAndDelete(id: string): Promise<void>;
  deleteMany(): Promise<void>;
}
