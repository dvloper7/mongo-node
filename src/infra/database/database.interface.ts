export default interface IDatabase {
  connect(): Promise<boolean>;
}
