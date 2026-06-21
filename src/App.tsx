import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom'
import { CartProvider } from './components/cart-provider'
import { SiteHeader } from './components/site-header'
import { SiteFooter } from './components/site-footer'
import { CartSheet } from './components/cart-sheet'
import { Hero } from './components/hero'
import { ProductGrid } from './components/product-grid'
import { CustomOrder } from './components/custom-order'
import { StorySection } from './components/story-section'
import { ProductDetail } from './components/product-detail'
import { CheckoutView } from './components/checkout-view'
import { getProduct } from './lib/products'
import { ScrollToTop } from './components/scroll-to-top'

function HomePage() {
  return (
    <>
      <Hero />
      <ProductGrid />
      <CustomOrder />
      <StorySection />
    </>
  )
}

function ProductPage() {
  const { id } = useParams<{ id: string }>()
  const product = getProduct(id || '')
  if (!product) {
    return <div>Producto no encontrado</div>
  }
  return <ProductDetail product={product} />
}

function App() {
  return (
    <CartProvider>
      <Router>
        <ScrollToTop />
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/producto/:id" element={<ProductPage />} />
              <Route path="/checkout" element={<CheckoutView />} />
            </Routes>
          </main>
          <SiteFooter />
          <CartSheet />
        </div>
      </Router>
    </CartProvider>
  )
}

export default App
