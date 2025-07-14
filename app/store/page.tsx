"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ShoppingCart, Search, Star, Plus, Minus, Heart } from "lucide-react"
import Image from "next/image"
import Navigation from "../components/Navigation"

export default function StorePage() {
  const [cart, setCart] = useState<{ [key: string]: number }>({})
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const categories = [
    { id: "all", name: "All Products" },
    { id: "hair", name: "Hair Care" },
    { id: "beard", name: "Beard Care" },
    { id: "styling", name: "Styling" },
    { id: "tools", name: "Tools" },
  ]

  const products = [
    {
      id: "1",
      name: "Premium Pomade",
      category: "styling",
      price: 4500,
      originalPrice: 5500,
      rating: 4.8,
      reviews: 124,
      image: "/pomade.jpg?height=300&width=250",
      description: "Professional-grade pomade for all-day hold and shine",
      inStock: true,
      featured: true,
    },
    {
      id: "2",
      name: "Beard Oil Elixir",
      category: "beard",
      price: 3500,
      rating: 4.9,
      reviews: 89,
      image: "/oil.jpg?height=300&width=250",
      description: "Nourishing blend of essential oils for healthy beard growth",
      inStock: true,
      featured: false,
    },
    {
      id: "3",
      name: "Clay Texture Paste",
      category: "styling",
      price: 3200,
      rating: 4.7,
      reviews: 156,
      image: "/paste.jpg?height=300&width=250",
      description: "Matte finish clay for natural, textured styles",
      inStock: true,
      featured: true,
    },
    {
      id: "4",
      name: "Luxury Shampoo",
      category: "hair",
      price: 2500,
      rating: 4.6,
      reviews: 203,
      image: "/shampoo.jpg?height=300&width=250",
      description: "Sulfate-free formula for daily cleansing and nourishment",
      inStock: false,
      featured: false,
    },
    {
      id: "5",
      name: "Professional Scissors",
      category: "tools",
      price: 1200,
      rating: 4.9,
      reviews: 67,
      image: "/41795.jpg?height=300&width=250",
      description: "Japanese steel scissors for precision cutting",
      inStock: true,
      featured: true,
    },
    {
      id: "6",
      name: "Beard Balm",
      category: "beard",
      price: 3200,
      rating: 4.8,
      reviews: 91,
      image: "/Balm.jpg?height=300&width=250",
      description: "Conditioning balm for styling and moisturizing",
      inStock: true,
      featured: false,
    },
  ]

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const addToCart = (productId: string) => {
    setCart((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1,
    }))
  }

  const removeFromCart = (productId: string) => {
    setCart((prev) => ({
      ...prev,
      [productId]: Math.max((prev[productId] || 0) - 1, 0),
    }))
  }

  const getTotalItems = () => {
    return Object.values(cart).reduce((sum, count) => sum + count, 0)
  }

  const getTotalPrice = () => {
    return Object.entries(cart).reduce((sum, [productId, count]) => {
      const product = products.find((p) => p.id === productId)
      return sum + (product?.price || 0) * count
    }, 0)
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 gap-6">
          <div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Our Products</h1>
            <p className="text-xl text-gray-600 max-w-2xl">
              Experience the difference with top hair products that enhance both the condition and beauty of your hair.
            </p>
          </div>

          {/* Cart Summary */}
          {getTotalItems() > 0 && (
            <Card className="border-0 shadow-lg bg-amber-600 text-white">
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <ShoppingCart className="h-6 w-6" />
                  <div>
                    <div className="font-semibold">{getTotalItems()} items</div>
                    <div className="text-amber-100">₹{getTotalPrice().toFixed(2)}</div>
                  </div>
                  <Button size="sm" className="bg-white hover:bg-gray-100 text-amber-600">
                    Checkout
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-12">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 py-3 rounded-full border-gray-200 focus:border-amber-500"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className={`whitespace-nowrap rounded-full transition-all duration-300 ${
                  selectedCategory === category.id
                    ? "bg-amber-600 hover:bg-amber-700 text-white"
                    : "hover:bg-amber-50 border-gray-200"
                }`}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Card
              key={product.id}
              className="group border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden bg-white"
            >
              <div className="relative overflow-hidden bg-gray-50">
                {product.featured && (
                  <Badge className="absolute top-3 left-3 z-10 bg-amber-600 text-white rounded-full">Featured</Badge>
                )}
                {product.originalPrice && (
                  <Badge className="absolute top-3 right-3 z-10 bg-red-500 text-white rounded-full">Sale</Badge>
                )}

                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Wishlist Button */}
                  <Button
                    size="sm"
                    variant="outline"
                    className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white/90 hover:bg-white border-0 shadow-lg w-8 h-8 p-0 rounded-full"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 text-sm group-hover:text-amber-600 transition-colors line-clamp-2">
                    {product.name}
                  </h3>
                  <div className="flex items-center ml-2">
                    <Star className="h-3 w-3 fill-amber-400 text-amber-400 mr-1" />
                    <span className="text-xs font-medium">{product.rating}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-gray-900">₹{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-400 line-through">₹{product.originalPrice}</span>
                    )}
                  </div>
                  <Badge
                    variant={product.inStock ? "default" : "secondary"}
                    className={`text-xs rounded-full ${
                      product.inStock ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {product.inStock ? "In Stock" : "Out of Stock"}
                  </Badge>
                </div>

                {/* Add to Cart Controls */}
                <div className="flex items-center justify-between">
                  {cart[product.id] > 0 ? (
                    <div className="flex items-center space-x-2 flex-1">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => removeFromCart(product.id)}
                        className="rounded-full w-7 h-7 p-0 border-amber-200"
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="font-semibold text-sm min-w-[1.5rem] text-center">{cart[product.id]}</span>
                      <Button
                        size="sm"
                        onClick={() => addToCart(product.id)}
                        className="rounded-full w-7 h-7 p-0 bg-amber-600 hover:bg-amber-700"
                        disabled={!product.inStock}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  ) : (
                    <Button
                      onClick={() => addToCart(product.id)}
                      disabled={!product.inStock}
                      size="sm"
                      className="flex-1 bg-amber-600 hover:bg-amber-700 text-white rounded-full transition-all duration-300 transform hover:scale-105"
                    >
                      <ShoppingCart className="mr-1 h-3 w-3" />
                      Add
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
            <Button
              onClick={() => {
                setSearchQuery("")
                setSelectedCategory("all")
              }}
              className="bg-amber-600 hover:bg-amber-700 text-white rounded-full"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
