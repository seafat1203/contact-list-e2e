
type User = {
  email: string;
  active: boolean
};

export function getUniqueActiveUser(users: User[]): string[] {
    const activeUsers = users.filter(user => user.active)
    .map(user => user.email);


  return Array.from(new Set(activeUsers));
}   