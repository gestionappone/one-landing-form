import { createLazyFileRoute } from '@tanstack/react-router';
import {
  Edit,
  Lock,
  Menu,
  Monitor,
  ShoppingCart,
  Smartphone,
  Tablet,
  Trash2,
  Unlock,
  X,
} from 'lucide-react';
import { useState } from 'react';
import { Badge } from 'ui-library/ui/badge';
import { Button } from 'ui-library/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from 'ui-library/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from 'ui-library/ui/dialog';
import { Input } from 'ui-library/ui/input';
import { Label } from 'ui-library/ui/label';
import { Switch } from 'ui-library/ui/switch';

export const Route = createLazyFileRoute('/milestones/')({
  component: Milestones,
});

function Milestones() {
  type Product = {
    id: number;
    name: string;
    price: number;
    image: string;
  };

  const products: Product[] = [
    {
      id: 1,
      name: 'Eco-friendly Water Bottle',
      price: 24.99,
      image: '/placeholder.svg?height=200&width=200',
    },
    {
      id: 2,
      name: 'Organic Cotton T-shirt',
      price: 29.99,
      image: '/placeholder.svg?height=200&width=200',
    },
    {
      id: 3,
      name: 'Recycled Paper Notebook',
      price: 14.99,
      image: '/placeholder.svg?height=200&width=200',
    },
    {
      id: 4,
      name: 'Bamboo Toothbrush Set',
      price: 12.99,
      image: '/placeholder.svg?height=200&width=200',
    },
  ];

  type Milestone = {
    id: number;
    name: string;
    price: number;
  };

  const milestones: Milestone[] = [
    { id: 1, name: 'Store Setup', price: 99 },
    { id: 2, name: 'Product Upload', price: 199 },
    { id: 3, name: 'Payment Integration', price: 299 },
    { id: 4, name: 'Launch', price: 499 },
  ];

  type Comment = {
    id: number;
    title: string;
    description: string;
    x: number;
    y: number;
    status: 'pending' | 'completed';
  };

  type Device = 'mobile' | 'tablet' | 'desktop';

  type NewComment = {
    title: string;
    description: string;
  };

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [completedMilestones, setCompletedMilestones] = useState<number[]>([1]);
  const [selectedMilestone, setSelectedMilestone] = useState<Milestone | null>(
    null,
  );
  const [selectedDevice, setSelectedDevice] = useState<Device>('desktop');
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<NewComment>({
    title: '',
    description: '',
  });
  const [commentPosition, setCommentPosition] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });
  const [isCommentModalOpen, setIsCommentModalOpen] = useState<boolean>(false);
  const [isHighlightModeOn, setIsHighlightModeOn] = useState<boolean>(false);
  const [highlightedComment, setHighlightedComment] = useState<Comment | null>(
    null,
  );
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleMilestoneClick = (milestone: Milestone) => {
    setSelectedMilestone(milestone);
  };

  const handlePayment = () => {
    if (selectedMilestone) {
      setCompletedMilestones([...completedMilestones, selectedMilestone.id]);
      setSelectedMilestone(null);
    }
  };

  const getDeviceClass = (): string => {
    switch (selectedDevice) {
      case 'mobile':
        return 'w-[320px] h-[568px]';
      case 'tablet':
        return 'w-[768px] h-[1024px]';
      default:
        return 'w-full h-[600px]';
    }
  };

  const handleComponentClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isHighlightModeOn) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCommentPosition({ x, y });
    setIsCommentModalOpen(true);
  };

  const handleCommentSubmit = () => {
    if (newComment.title.trim() && newComment.description.trim()) {
      if (editingCommentId !== null) {
        setComments(
          comments.map((comment) =>
            comment.id === editingCommentId
              ? { ...comment, ...newComment }
              : comment,
          ),
        );
        setEditingCommentId(null);
      } else {
        setComments([
          ...comments,
          {
            id: Date.now(),
            ...commentPosition,
            ...newComment,
            status: 'pending',
          },
        ]);
      }
      setNewComment({ title: '', description: '' });
      setIsCommentModalOpen(false);
    }
  };

  const handleEditComment = (comment: Comment) => {
    setNewComment({ title: comment.title, description: comment.description });
    setEditingCommentId(comment.id);
    setIsCommentModalOpen(true);
  };

  const handleDeleteComment = (commentId: number) => {
    setComments(comments.filter((comment) => comment.id !== commentId));
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">
        E-commerce Store Builder
      </h1>

      {/* Device Selection and Highlight Mode Buttons */}
      <div className="flex justify-center mb-4 space-x-4">
        <Button
          variant={selectedDevice === 'mobile' ? 'default' : 'outline'}
          onClick={() => setSelectedDevice('mobile')}
        >
          <Smartphone className="mr-2 h-4 w-4" /> Mobile
        </Button>
        <Button
          variant={selectedDevice === 'tablet' ? 'default' : 'outline'}
          onClick={() => setSelectedDevice('tablet')}
        >
          <Tablet className="mr-2 h-4 w-4" /> Tablet
        </Button>
        <Button
          variant={selectedDevice === 'desktop' ? 'default' : 'outline'}
          onClick={() => setSelectedDevice('desktop')}
        >
          <Monitor className="mr-2 h-4 w-4" /> Desktop
        </Button>
        <div className="flex items-center space-x-2">
          <Switch
            id="highlight-mode"
            checked={isHighlightModeOn}
            onCheckedChange={setIsHighlightModeOn}
          />
          <Label htmlFor="highlight-mode">Highlight Mode</Label>
        </div>
      </div>

      {/* Embedded E-commerce Container */}
      <div
        className={`mx-auto bg-white rounded-lg shadow-lg overflow-hidden border-4 border-gray-300 mb-6 ${getDeviceClass()} relative`}
      >
        <div className="flex flex-col h-full">
          {/* Simulated Browser Bar */}
          <div className="bg-gray-200 p-2 flex items-center">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="ml-4 bg-white rounded px-2 py-1 text-sm flex-grow">
              https://your-eco-shop.com
            </div>
          </div>

          {/* E-commerce Content */}
          <div
            className="flex-1 overflow-auto relative"
            onClick={handleComponentClick}
          >
            <header
              className={`sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 ${isHighlightModeOn ? 'hover:outline hover:outline-2 hover:outline-blue-500' : ''}`}
            >
              <div className="container flex h-14 items-center">
                <div className="mr-4 hidden md:flex">
                  <a className="mr-6 flex items-center space-x-2" href="/">
                    <span className="hidden font-bold sm:inline-block">
                      EcoShop
                    </span>
                  </a>
                  <nav className="flex items-center space-x-6 text-sm font-medium">
                    <a
                      className="transition-colors hover:text-foreground/80 text-foreground"
                      href="/products"
                    >
                      Products
                    </a>
                    <a
                      className="transition-colors hover:text-foreground/80 text-foreground/60"
                      href="/about"
                    >
                      About
                    </a>
                    <a
                      className="transition-colors hover:text-foreground/80 text-foreground/60"
                      href="/contact"
                    >
                      Contact
                    </a>
                  </nav>
                </div>
                <button
                  className="inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-9 py-2 mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
                  type="button"
                  aria-haspopup="dialog"
                  aria-expanded={isMenuOpen}
                  aria-controls="radix-:R1mcq:"
                  onClick={toggleMenu}
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </button>
                {isMenuOpen && (
                  <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm md:hidden">
                    <div className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg">
                      <div className="flex flex-col space-y-4">
                        <a
                          className="text-sm font-medium text-primary"
                          href="/products"
                        >
                          Products
                        </a>
                        <a
                          className="text-sm font-medium text-muted-foreground"
                          href="/about"
                        >
                          About
                        </a>
                        <a
                          className="text-sm font-medium text-muted-foreground"
                          href="/contact"
                        >
                          Contact
                        </a>
                      </div>
                      <button
                        className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
                        onClick={toggleMenu}
                      >
                        <X className="h-4 w-4" />
                        <span className="sr-only">Close</span>
                      </button>
                    </div>
                  </div>
                )}
                <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                  <nav className="flex items-center">
                    <Button variant="ghost" size="icon">
                      <ShoppingCart className="h-5 w-5" />
                      <span className="sr-only">Open cart</span>
                    </Button>
                  </nav>
                </div>
              </div>
            </header>
            <main className="flex-1 container py-6">
              <h2
                className={`text-2xl font-bold mb-6 ${isHighlightModeOn ? 'hover:outline hover:outline-2 hover:outline-blue-500' : ''}`}
              >
                Our Products
              </h2>
              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                {products.map((product) => (
                  <Card
                    key={product.id}
                    className={`${isHighlightModeOn ? 'hover:outline hover:outline-2 hover:outline-blue-500' : ''}`}
                  >
                    <CardHeader>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-48 object-cover"
                      />
                    </CardHeader>
                    <CardContent>
                      <CardTitle>{product.name}</CardTitle>
                      <p className="text-2xl font-bold mt-2">
                        ${product.price.toFixed(2)}
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Add to Cart</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </main>
            {comments.map((comment, index) => (
              <div
                key={index}
                className={`absolute w-4 h-4 bg-blue-500 rounded-full cursor-pointer ${highlightedComment && highlightedComment.id === comment.id ? 'ring-2 ring-green-500 ring-offset-2' : ''}`}
                style={{ left: comment.x, top: comment.y }}
                title={comment.title}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Comment Modal */}
      <Dialog open={isCommentModalOpen} onOpenChange={setIsCommentModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingCommentId !== null
                ? 'Edit Requirement'
                : 'Add a Requirement'}
            </DialogTitle>
            <DialogDescription>
              {editingCommentId !== null
                ? 'Edit your requirement for this section of the e-commerce site.'
                : 'Enter your requirement for this section of the e-commerce site.'}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                value={newComment.title}
                onChange={(e) =>
                  setNewComment({ ...newComment, title: e.target.value })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input
                id="description"
                value={newComment.description}
                onChange={(e) =>
                  setNewComment({
                    ...newComment,
                    description: e.target.value,
                  })
                }
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleCommentSubmit}>
              {editingCommentId !== null
                ? 'Update Requirement'
                : 'Save Requirement'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Requirements Section */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <h2 className="text-xl font-bold mb-4">Requirements</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {comments.map((comment) => (
            <Card
              key={comment.id}
              className="relative"
              onMouseEnter={() => setHighlightedComment(comment)}
              onMouseLeave={() => setHighlightedComment(null)}
            >
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    {comment.title}
                    <Badge
                      variant="secondary"
                      className="bg-orange-200 text-orange-700"
                    >
                      {comment.status}
                    </Badge>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEditComment(comment)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteComment(comment.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>{comment.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Milestones Section */}
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-xl font-bold mb-4">E-commerce Setup Progress</h2>
        <div className="flex flex-wrap justify-between items-center gap-2">
          {milestones.map((milestone) => (
            <Dialog key={milestone.id}>
              <DialogTrigger asChild>
                <Button
                  variant={
                    completedMilestones.includes(milestone.id)
                      ? 'default'
                      : 'outline'
                  }
                  className="flex-1 min-w-[120px]"
                  onClick={() => handleMilestoneClick(milestone)}
                >
                  {completedMilestones.includes(milestone.id) ? (
                    <Unlock className="w-4 h-4 mr-2" />
                  ) : (
                    <Lock className="w-4 h-4 mr-2" />
                  )}
                  {milestone.name}
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{milestone.name}</DialogTitle>
                  <DialogDescription>
                    Complete this milestone to progress in your e-commerce
                    setup.
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <p className="text-2xl font-bold">${milestone.price}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    One-time payment
                  </p>
                </div>
                <DialogFooter>
                  <Button onClick={handlePayment}>Pay and Unlock</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </div>
  );
}
