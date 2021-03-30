export const inventory = ({ id }: { id: string }) => ({
  id: `inventory:${id}`,
  size: 40,
  items: [{
    id: 1,
    name: "test"
  }]
});
