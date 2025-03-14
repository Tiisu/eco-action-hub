
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Trophy, Medal, Award } from "lucide-react";

export default function Leaderboard() {
  // Placeholder data - would come from database in real implementation
  const topUsers = [
    { id: 1, name: "Sarah Johnson", points: 1250, avatar: "https://i.pravatar.cc/150?img=1" },
    { id: 2, name: "Michael Chen", points: 980, avatar: "https://i.pravatar.cc/150?img=8" },
    { id: 3, name: "Emma Davis", points: 850, avatar: "https://i.pravatar.cc/150?img=5" },
    { id: 4, name: "Robert Wilson", points: 720, avatar: "https://i.pravatar.cc/150?img=10" },
    { id: 5, name: "Sophia Garcia", points: 690, avatar: "https://i.pravatar.cc/150?img=3" },
  ];
  
  const topAgents = [
    { id: 1, name: "Green Solutions Co.", points: 3450, avatar: "https://i.pravatar.cc/150?img=15" },
    { id: 2, name: "EcoCollect Ltd.", points: 2980, avatar: "https://i.pravatar.cc/150?img=18" },
    { id: 3, name: "RecycleForward", points: 2650, avatar: "https://i.pravatar.cc/150?img=25" },
    { id: 4, name: "CleanPlanet Inc.", points: 2120, avatar: "https://i.pravatar.cc/150?img=20" },
    { id: 5, name: "EarthFirst Recycling", points: 1890, avatar: "https://i.pravatar.cc/150?img=23" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-12 mt-16">
        <h1 className="text-4xl font-bold mb-6 text-center text-pci-800">PCI Leaderboard</h1>
        <p className="text-lg text-gray-700 mb-10 text-center max-w-2xl mx-auto">
          Recognizing our top contributors making a positive impact through plastic waste management.
        </p>
        
        <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {/* Top Users Section */}
          <div className="bg-white rounded-lg shadow-subtle p-6">
            <div className="flex items-center gap-3 mb-6">
              <Trophy className="h-6 w-6 text-pci-600" />
              <h2 className="text-2xl font-semibold text-pci-700">Top Users</h2>
            </div>
            
            <div className="space-y-6">
              {topUsers.map((user, index) => (
                <div key={user.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  {index < 3 && (
                    <div className="flex-shrink-0">
                      {index === 0 ? (
                        <Trophy className="h-6 w-6 text-yellow-500" />
                      ) : index === 1 ? (
                        <Medal className="h-6 w-6 text-gray-400" />
                      ) : (
                        <Award className="h-6 w-6 text-amber-700" />
                      )}
                    </div>
                  )}
                  <div className="flex-shrink-0 w-8 text-center font-medium text-gray-500">
                    {index > 2 && `#${index + 1}`}
                  </div>
                  <img 
                    src={user.avatar} 
                    alt={user.name} 
                    className="h-10 w-10 rounded-full"
                  />
                  <div className="flex-grow">
                    <h3 className="font-medium">{user.name}</h3>
                  </div>
                  <div className="text-pci-600 font-semibold">
                    {user.points.toLocaleString()} pts
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Top Agents Section */}
          <div className="bg-white rounded-lg shadow-subtle p-6">
            <div className="flex items-center gap-3 mb-6">
              <Trophy className="h-6 w-6 text-pci-600" />
              <h2 className="text-2xl font-semibold text-pci-700">Top Agents</h2>
            </div>
            
            <div className="space-y-6">
              {topAgents.map((agent, index) => (
                <div key={agent.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  {index < 3 && (
                    <div className="flex-shrink-0">
                      {index === 0 ? (
                        <Trophy className="h-6 w-6 text-yellow-500" />
                      ) : index === 1 ? (
                        <Medal className="h-6 w-6 text-gray-400" />
                      ) : (
                        <Award className="h-6 w-6 text-amber-700" />
                      )}
                    </div>
                  )}
                  <div className="flex-shrink-0 w-8 text-center font-medium text-gray-500">
                    {index > 2 && `#${index + 1}`}
                  </div>
                  <img 
                    src={agent.avatar} 
                    alt={agent.name} 
                    className="h-10 w-10 rounded-full"
                  />
                  <div className="flex-grow">
                    <h3 className="font-medium">{agent.name}</h3>
                  </div>
                  <div className="text-pci-600 font-semibold">
                    {agent.points.toLocaleString()} pts
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
