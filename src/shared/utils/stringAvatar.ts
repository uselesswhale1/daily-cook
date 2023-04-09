export default function stringAvatar(name: string = '? ?') {
  const [firstName, lastName] = name.split(' ');

  return { children: `${firstName ? firstName[0] : ''}${lastName ? lastName[0] : ''}` };
}
