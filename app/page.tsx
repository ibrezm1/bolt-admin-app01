'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { User } from '@/lib/types';
import { UserPlus, LogOut } from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      router.push('/login');
      return;
    }

    fetchUsers();
  }, [router]);

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/users');
      const data = await res.json();
      setUsers(data.users);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: newUsername, password: newPassword }),
      });

      if (res.ok) {
        setNewUsername('');
        setNewPassword('');
        setIsDialogOpen(false);
        fetchUsers();
      }
    } catch (error) {
      console.error('Failed to create user:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <Button variant="ghost" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Admin Users</h2>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="w-4 h-4 mr-2" />
                Add User
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Admin User</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleCreateUser} className="space-y-4">
                <Input
                  placeholder="Username"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  required
                />
                <Input
                  type="password"
                  placeholder="Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
                <Button type="submit" className="w-full">
                  Create User
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="bg-card rounded-lg shadow">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Username</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Updated At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.username}</TableCell>
                  <TableCell className="capitalize">{user.role}</TableCell>
                  <TableCell>
                    {new Date(user.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {new Date(user.updatedAt).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  );
}