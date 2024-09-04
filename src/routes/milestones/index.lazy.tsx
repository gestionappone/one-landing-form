import { createLazyFileRoute } from '@tanstack/react-router';
import {
  CheckCircle,
  CreditCard,
  Edit,
  Leaf,
  Menu,
  Minus,
  Monitor,
  Notebook,
  Plus,
  Search,
  Send,
  ShoppingCart,
  Smartphone,
  Tablet,
  Trash2,
  X,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from 'ui-library/ui/accordion';
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
import { Popover, PopoverContent, PopoverTrigger } from 'ui-library/ui/popover';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from 'ui-library/ui/sheet';
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

  const products = [
    {
      id: 1,
      name: 'Eco-friendly Water Bottle',
      price: 24.99,
      image: '/placeholder.svg?height=200&width=200',
      description:
        'Stay hydrated with our durable and stylish eco-friendly water bottle.',
    },
    {
      id: 2,
      name: 'Organic Cotton T-shirt',
      price: 29.99,
      image: '/placeholder.svg?height=200&width=200',
      description:
        'Feel comfortable and look great in our soft, organic cotton t-shirt.',
    },
    {
      id: 3,
      name: 'Recycled Paper Notebook',
      price: 14.99,
      image: '/placeholder.svg?height=200&width=200',
      description:
        'Jot down your thoughts in our environmentally conscious recycled paper notebook.',
    },
    {
      id: 4,
      name: 'Bamboo Toothbrush Set',
      price: 12.99,
      image: '/placeholder.svg?height=200&width=200',
      description:
        'Maintain your oral hygiene while reducing plastic waste with our bamboo toothbrush set.',
    },
    {
      id: 5,
      name: 'Solar-Powered Charger',
      price: 39.99,
      image: '/placeholder.svg?height=200&width=200',
      description:
        'Charge your devices on the go with our efficient solar-powered charger.',
    },
    {
      id: 6,
      name: 'Reusable Produce Bags',
      price: 9.99,
      image: '/placeholder.svg?height=200&width=200',
      description:
        'Say goodbye to single-use plastic bags with our durable reusable produce bags.',
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

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [completedMilestones, setCompletedMilestones] = useState([]);
  const [selectedMilestone, setSelectedMilestone] = useState(null);
  const [selectedDevice, setSelectedDevice] = useState('desktop');
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({ title: '', description: '' });
  const [commentPosition, setCommentPosition] = useState({ x: 0, y: 0 });
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [isHighlightModeOn, setIsHighlightModeOn] = useState(false);
  const [highlightedComment, setHighlightedComment] = useState(null);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [selectedComments, setSelectedComments] = useState([]);
  const [currentPage, setCurrentPage] = useState('home');
  const [isMilestoneModalOpen, setIsMilestoneModalOpen] = useState(false);
  const [isReviewSubmitted, setIsReviewSubmitted] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    if (isHighlightModeOn) {
      setHighlightedComment(null);
    }
  }, [currentPage, isHighlightModeOn]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleMilestoneClick = (milestone) => {
    setSelectedMilestone(milestone);
  };

  const handlePayment = () => {
    if (
      selectedMilestone &&
      comments.filter((c) => c.status === 'validated').length >=
        selectedMilestone.requiredComments
    ) {
      setCompletedMilestones([...completedMilestones, selectedMilestone.id]);
      setSelectedMilestone(null);
    }
  };

  const getDeviceClass = () => {
    switch (selectedDevice) {
      case 'mobile':
        return 'w-[320px] h-[568px]';
      case 'tablet':
        return 'w-[768px] h-[1024px]';
      default:
        return 'w-full h-[600px]';
    }
  };

  const handleComponentClick = (e) => {
    if (!isHighlightModeOn || comments.length >= 10) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCommentPosition({ x, y });
    setIsCommentModalOpen(true);
    setEditingCommentId(null);
    setNewComment({ title: '', description: '' });
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
      } else if (comments.length < 10) {
        setComments([
          ...comments,
          {
            id: Date.now(),
            ...commentPosition,
            ...newComment,
            status: 'pending',
            page: currentPage,
            tagAttachment: 'snippet-8ksf1srmzvC8chX71V6csGjwy7SGHg.txt',
          },
        ]);
      }
      setNewComment({ title: '', description: '' });
      setIsCommentModalOpen(false);
    }
  };

  const handleEditComment = (comment, e) => {
    e.stopPropagation();
    setNewComment({ title: comment.title, description: comment.description });
    setEditingCommentId(comment.id);
    setIsCommentModalOpen(true);
  };

  const handleDeleteComment = (commentId, e) => {
    e.stopPropagation();
    setComments(comments.filter((comment) => comment.id !== commentId));
    setSelectedComments(selectedComments.filter((id) => id !== commentId));
  };

  const handleValidateComment = (commentId) => {
    setComments(
      comments.map((comment) =>
        comment.id === commentId
          ? { ...comment, status: 'validated' }
          : comment,
      ),
    );
  };

  const toggleCommentSelection = (commentId) => {
    setSelectedComments((prevSelected) =>
      prevSelected.includes(commentId)
        ? prevSelected.filter((id) => id !== commentId)
        : [...prevSelected, commentId],
    );
  };

  const handleSubmitForReview = () => {
    setIsReviewSubmitted(true);
    // Aquí iría la lógica para enviar los requerimientos a revisión
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setCurrentPage('product');
  };

  const handleAddToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const handleRemoveFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity === 0) {
      handleRemoveFromCart(productId);
    } else {
      setCart(
        cart.map((item) =>
          item.id === productId ? { ...item, quantity: newQuantity } : item,
        ),
      );
    }
  };

  const getTotalPrice = () => {
    return cart
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const renderPageContent = () => {
    switch (currentPage) {
      case 'products':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6">Our Products</h2>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProducts.map((product) => (
                <Card
                  key={product.id}
                  className={`${isHighlightModeOn ? 'hover:outline hover:outline-2 hover:outline-blue-500' : ''}`}
                >
                  <CardHeader>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover cursor-pointer"
                      onClick={() => handleProductClick(product)}
                    />
                  </CardHeader>
                  <CardContent>
                    <CardTitle
                      className="cursor-pointer"
                      onClick={() => handleProductClick(product)}
                    >
                      {product.name}
                    </CardTitle>
                    <p className="text-2xl font-bold mt-2">
                      ${product.price.toFixed(2)}
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full"
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to Cart
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        );
      case 'product':
        return selectedProduct ? (
          <div>
            <h2 className="text-2xl font-bold mb-6">{selectedProduct.name}</h2>
            <div className="flex flex-col md:flex-row gap-6">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full md:w-1/2 h-64 object-cover rounded-lg"
              />
              <div className="flex flex-col justify-between">
                <div>
                  <p className="text-xl mb-4">{selectedProduct.description}</p>
                  <p className="text-3xl font-bold mb-4">
                    ${selectedProduct.price.toFixed(2)}
                  </p>
                </div>
                <Button
                  className="w-full md:w-auto"
                  onClick={() => handleAddToCart(selectedProduct)}
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        ) : null;
      case 'about':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6">About Us</h2>
            <p className="mb-4">
              We are committed to providing eco-friendly products that help
              reduce environmental impact.
            </p>
            <p className="mb-4">
              Our mission is to make sustainable living accessible and
              affordable for everyone. We carefully select each product in our
              inventory to ensure it meets our high standards for quality and
              environmental responsibility.
            </p>
            <p>
              By choosing EcoShop, you're not just making a purchase - you're
              making a positive impact on the planet.
            </p>
          </div>
        );
      case 'contact':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6">Contact Us</h2>
            <p className="mb-4">
              Get in touch with us for any inquiries or support. We're here to
              help!
            </p>
            <form className="mt-4 space-y-4">
              <div>
                <Label htmlFor="name">Your Name</Label>
                <Input id="name" className="mt-1" placeholder="John Doe" />
              </div>
              <div>
                <Label htmlFor="email">Your Email</Label>
                <Input
                  id="email"
                  type="email"
                  className="mt-1"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <Label htmlFor="message">Your Message</Label>
                <textarea
                  id="message"
                  className="w-full p-2 border rounded mt-1"
                  rows={4}
                  placeholder="How can we help you?"
                ></textarea>
              </div>
              <Button className="w-full">Send Message</Button>
            </form>
          </div>
        );
      default:
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6">Welcome to EcoShop</h2>
            <p className="mb-4">
              Discover our range of sustainable and eco-friendly products.
            </p>
            <p className="mb-4">
              At EcoShop, we believe that small changes can make a big
              difference. Our curated selection of environmentally conscious
              products is designed to help you reduce your carbon footprint
              without compromising on quality or style.
            </p>
            <p>
              Browse our categories to find everything from reusable everyday
              items to innovative eco-tech solutions. Join us in our mission to
              create a more sustainable future, one purchase at a time.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 p-4">
      <div className="flex justify-between items-center mb-4">
        <Leaf className="h-8 w-8 text-green-500" />
        <div className="flex items-center space-x-2">
          <Button
            variant={selectedDevice === 'mobile' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedDevice('mobile')}
          >
            <Smartphone className="h-4 w-4" />
          </Button>
          <Button
            variant={selectedDevice === 'tablet' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedDevice('tablet')}
          >
            <Tablet className="h-4 w-4" />
          </Button>
          <Button
            variant={selectedDevice === 'desktop' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedDevice('desktop')}
          >
            <Monitor className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-2">
            <Switch
              id="highlight-mode"
              checked={isHighlightModeOn}
              onCheckedChange={setIsHighlightModeOn}
            />
            <Label htmlFor="highlight-mode" className="text-sm">
              HL
            </Label>
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm">
                <Notebook className="h-4 w-4 mr-2" />
                {comments.length}/10
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Requirements ({comments.length}/10)</SheetTitle>
                <SheetDescription>
                  Review and manage your project requirements here.
                </SheetDescription>
              </SheetHeader>
              <Accordion type="single" collapsible className="w-full">
                {comments.map((comment, index) => (
                  <AccordionItem key={comment.id} value={`item-${index}`}>
                    <AccordionTrigger>
                      <div className="flex items-center space-x-2">
                        <span>{comment.title}</span>
                        <Badge
                          variant="secondary"
                          className={`${comment.status === 'validated' ? 'bg-green-200 text-green-700' : 'bg-orange-200 text-orange-700'}`}
                        >
                          {comment.status}
                        </Badge>
                        <Badge variant="outline">{comment.page}</Badge>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <p>{comment.description}</p>
                      <p className="text-xs text-gray-500 mt-2">
                        {comment.tagAttachment}
                      </p>
                      <div className="flex space-x-2 mt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditComment(comment)}
                        >
                          <Edit className="h-4 w-4 mr-2" /> Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleValidateComment(comment.id)}
                        >
                          <CheckCircle className="h-4 w-4 mr-2" /> Validate
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteComment(comment.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" /> Delete
                        </Button>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </SheetContent>
          </Sheet>
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
              {currentPage !== 'home' ? `/${currentPage}` : ''}
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
                  <a
                    className="mr-6 flex items-center space-x-2"
                    href="#"
                    onClick={() => setCurrentPage('home')}
                  >
                    <span className="hidden font-bold sm:inline-block">
                      EcoShop
                    </span>
                  </a>
                  <nav className="flex items-center space-x-6 text-sm font-medium">
                    <a
                      className={`transition-colors hover:text-foreground/80 ${currentPage === 'products' ? 'text-foreground' : 'text-foreground/60'}`}
                      href="#"
                      onClick={() => setCurrentPage('products')}
                    >
                      Products
                    </a>
                    <a
                      className={`transition-colors hover:text-foreground/80 ${currentPage === 'about' ? 'text-foreground' : 'text-foreground/60'}`}
                      href="#"
                      onClick={() => setCurrentPage('about')}
                    >
                      About
                    </a>
                    <a
                      className={`transition-colors hover:text-foreground/80 ${currentPage === 'contact' ? 'text-foreground' : 'text-foreground/60'}`}
                      href="#"
                      onClick={() => setCurrentPage('contact')}
                    >
                      Contact
                    </a>
                  </nav>
                </div>
                <div className="flex-1 md:flex-none relative" ref={searchRef}>
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search products..."
                      className="pl-8 md:w-[300px]"
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setShowSearchResults(true);
                      }}
                    />
                  </div>
                  {showSearchResults && searchTerm && (
                    <div className="absolute z-10 w-full bg-white shadow-lg rounded-b-md mt-1">
                      {filteredProducts.map((product) => (
                        <div
                          key={product.id}
                          className="p-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => {
                            handleProductClick(product);
                            setShowSearchResults(false);
                          }}
                        >
                          {product.name}
                        </div>
                      ))}
                    </div>
                  )}
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
                          href="#"
                          onClick={() => {
                            setCurrentPage('products');
                            toggleMenu();
                          }}
                        >
                          Products
                        </a>
                        <a
                          className="text-sm font-medium text-muted-foreground"
                          href="#"
                          onClick={() => {
                            setCurrentPage('about');
                            toggleMenu();
                          }}
                        >
                          About
                        </a>
                        <a
                          className="text-sm font-medium text-muted-foreground"
                          href="#"
                          onClick={() => {
                            setCurrentPage('contact');
                            toggleMenu();
                          }}
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
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <ShoppingCart className="h-5 w-5" />
                          <span className="sr-only">Open cart</span>
                          {cart.length > 0 && (
                            <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                              {cart.reduce(
                                (total, item) => total + item.quantity,
                                0,
                              )}
                            </span>
                          )}
                        </Button>
                      </SheetTrigger>
                      <SheetContent side="right" className="w-full sm:max-w-sm">
                        <SheetHeader>
                          <SheetTitle>Your Cart</SheetTitle>
                        </SheetHeader>
                        {cart.length === 0 ? (
                          <p>Your cart is empty.</p>
                        ) : (
                          <>
                            {cart.map((item) => (
                              <div
                                key={item.id}
                                className="flex items-center justify-between py-2"
                              >
                                <div>
                                  <p>{item.name}</p>
                                  <p className="text-sm text-gray-500">
                                    ${item.price.toFixed(2)} x {item.quantity}
                                  </p>
                                </div>
                                <div className="flex items-center">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() =>
                                      handleUpdateQuantity(
                                        item.id,
                                        item.quantity - 1,
                                      )
                                    }
                                  >
                                    -
                                  </Button>
                                  <span className="mx-2">{item.quantity}</span>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() =>
                                      handleUpdateQuantity(
                                        item.id,
                                        item.quantity + 1,
                                      )
                                    }
                                  >
                                    +
                                  </Button>
                                </div>
                              </div>
                            ))}
                            <div className="mt-4">
                              <p className="font-bold">
                                Total: ${getTotalPrice()}
                              </p>
                            </div>
                            <Button className="w-full mt-4">
                              Proceed to Checkout
                            </Button>
                          </>
                        )}
                      </SheetContent>
                    </Sheet>
                  </nav>
                </div>
              </div>
            </header>
            <main className="flex-1 container py-6">{renderPageContent()}</main>
            {isHighlightModeOn &&
              comments
                .filter((comment) => comment.page === currentPage)
                .map((comment, index) => (
                  <div
                    key={index}
                    className="absolute group"
                    style={{ left: comment.x, top: comment.y }}
                  >
                    <div
                      className={`w-4 h-4 bg-blue-500 rounded-full cursor-pointer ${highlightedComment && highlightedComment.id === comment.id ? 'ring-2 ring-green-500 ring-offset-2' : ''}`}
                      title={comment.title}
                      onClick={() => toggleCommentSelection(comment.id)}
                    />
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 px-2 py-1 bg-white text-xs rounded shadow">
                      {comment.title}
                    </div>
                    <div className="hidden group-hover:flex absolute top-0 left-full ml-2 space-x-1">
                      <Button
                        variant="outline"
                        size="icon"
                        className="w-6 h-6 p-0"
                        onClick={(e) => handleEditComment(comment, e)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="w-6 h-6 p-0"
                        onClick={(e) => handleDeleteComment(comment.id, e)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
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
              <textarea
                id="description"
                value={newComment.description}
                onChange={(e) =>
                  setNewComment({ ...newComment, description: e.target.value })
                }
                className="col-span-3 p-2 border rounded"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleCommentSubmit}>
              {editingCommentId !== null ? 'Update' : 'Add'} Requirement
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Milestone Modal */}
      <Dialog
        open={isMilestoneModalOpen}
        onOpenChange={setIsMilestoneModalOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Select a Milestone</DialogTitle>
            <DialogDescription>
              Choose a milestone to work towards. Each milestone requires a
              certain number of validated requirements.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {milestones.map((milestone) => (
              <div
                key={milestone.id}
                className="flex items-center justify-between p-2 border rounded"
              >
                <div>
                  <h3 className="font-semibold">{milestone.name}</h3>
                  <p className="text-sm text-gray-500">
                    Required comments: {milestone.requiredComments}
                  </p>
                </div>
                <Button
                  onClick={() => handleMilestoneClick(milestone)}
                  disabled={completedMilestones.includes(milestone.id)}
                >
                  {completedMilestones.includes(milestone.id)
                    ? 'Completed'
                    : `$${milestone.price}`}
                </Button>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Action Buttons */}
      <div className="flex justify-center mt-4">
        {!isReviewSubmitted ? (
          <Button
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110"
            onClick={handleSubmitForReview}
            disabled={comments.length === 0}
          >
            <Send className="w-5 h-5 mr-2" />
            Enviar a revisión
          </Button>
        ) : (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                disabled={true}
              >
                <CreditCard className="w-5 h-5 mr-2" />
                Pagar
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <p className="text-sm text-gray-600">
                En este momento nos encontramos revisando los requerimientos que
                nos ha enviado. En cuanto terminemos, le haremos una oferta.
                Gracias por su paciencia.
              </p>
            </PopoverContent>
          </Popover>
        )}
      </div>
    </div>
  );
}
