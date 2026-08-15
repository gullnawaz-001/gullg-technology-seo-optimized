sed -i "4s/^/import { EstimatorAdmin } from '..\/components\/EstimatorAdmin';\n/" src/modules/AdminDashboard.tsx

sed -i "/{ id: 'leads', label: 'Lead Management', icon: Users },/a \ \ \ \ \ \ \ \ \ \ \ \ \ \ { id: 'estimator', label: 'Estimator Admin', icon: Calculator }," src/modules/AdminDashboard.tsx

# insert the switch case for estimator
sed -i "/case 'chatbot':/i \      case 'estimator':\n        return (\n          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className=\"bg-[#1C3F36] rounded-3xl p-1 shadow-sm overflow-hidden h-full\">\n            <EstimatorAdmin />\n          </motion.div>\n        );\n" src/modules/AdminDashboard.tsx
