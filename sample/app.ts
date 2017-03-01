export class App {
  properties = [
    {
      name: 'Name',
      key: 'name'
    },
    {
      name: 'Category',
      key: 'category[0].name'
    },
    {
      name: 'Address',
      key: 'location.address'
    },
    {
      name: 'Updated At',
      key: 'updatedAt'
    }
  ];
  list = []
  total = 2;
  limit = 5;
  skip = 3;

  search(){
    //search something to fill `list` property
  }
  
}
