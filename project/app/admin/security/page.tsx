'use client';

import { useState, useEffect } from 'react';
import { AdminGuard } from '@/components/auth/admin-guard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, 
  AlertTriangle, 
  Activity, 
  Eye, 
  Download,
  RefreshCw,
  Search,
  Filter,
  Ban,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
  Users,
  Globe
} from 'lucide-react';
import { SecurityValidator, SecurityAuditLog } from '@/lib/security';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface SecurityStats {
  totalEvents: number;
  criticalEvents: number;
  blockedIPs: number;
  successfulLogins: number;
  failedLogins: number;
  suspiciousActivity: number;
}

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export default function SecurityDashboard() {
  const [logs, setLogs] = useState<SecurityAuditLog[]>([]);
  const [filteredLogs, setFilteredLogs] = useState<SecurityAuditLog[]>([]);
  const [stats, setStats] = useState<SecurityStats>({
    totalEvents: 0,
    criticalEvents: 0,
    blockedIPs: 0,
    successfulLogins: 0,
    failedLogins: 0,
    suspiciousActivity: 0
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');
  const [selectedTimeRange, setSelectedTimeRange] = useState<string>('24h');
  const [autoRefresh, setAutoRefresh] = useState(false);

  // Charger les logs de sécurité
  const loadSecurityLogs = () => {
    const securityLogs = SecurityValidator.getSecurityLogs(500);
    setLogs(securityLogs);
    
    // Calculer les statistiques
    const now = new Date();
    const timeRanges = {
      '1h': 60 * 60 * 1000,
      '24h': 24 * 60 * 60 * 1000,
      '7d': 7 * 24 * 60 * 60 * 1000,
      '30d': 30 * 24 * 60 * 60 * 1000
    };
    
    const timeLimit = timeRanges[selectedTimeRange as keyof typeof timeRanges] || timeRanges['24h'];
    const recentLogs = securityLogs.filter(log => 
      now.getTime() - new Date(log.timestamp).getTime() < timeLimit
    );
    
    const newStats: SecurityStats = {
      totalEvents: recentLogs.length,
      criticalEvents: recentLogs.filter(log => log.severity === 'critical').length,
      blockedIPs: recentLogs.filter(log => log.event === 'IP_BLOCKED').length,
      successfulLogins: recentLogs.filter(log => log.event === 'SUCCESSFUL_LOGIN').length,
      failedLogins: recentLogs.filter(log => log.event === 'FAILED_LOGIN_ATTEMPT').length,
      suspiciousActivity: recentLogs.filter(log => 
        log.event.includes('INJECTION') || 
        log.event.includes('XSS') || 
        log.event.includes('SUSPICIOUS')
      ).length
    };
    
    setStats(newStats);
  };

  // Filtrer les logs
  useEffect(() => {
    let filtered = logs;
    
    // Filtre par terme de recherche
    if (searchTerm) {
      filtered = filtered.filter(log =>
        log.event.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.ip?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filtre par sévérité
    if (selectedSeverity !== 'all') {
      filtered = filtered.filter(log => log.severity === selectedSeverity);
    }
    
    // Filtre par période
    const now = new Date();
    const timeRanges = {
      '1h': 60 * 60 * 1000,
      '24h': 24 * 60 * 60 * 1000,
      '7d': 7 * 24 * 60 * 60 * 1000,
      '30d': 30 * 24 * 60 * 60 * 1000
    };
    
    const timeLimit = timeRanges[selectedTimeRange as keyof typeof timeRanges] || timeRanges['24h'];
    filtered = filtered.filter(log => 
      now.getTime() - new Date(log.timestamp).getTime() < timeLimit
    );
    
    setFilteredLogs(filtered.sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    ));
  }, [logs, searchTerm, selectedSeverity, selectedTimeRange]);

  // Auto-refresh
  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(loadSecurityLogs, 10000); // Refresh toutes les 10 secondes
      return () => clearInterval(interval);
    }
  }, [autoRefresh, selectedTimeRange]);

  // Charger les logs au montage
  useEffect(() => {
    loadSecurityLogs();
  }, [selectedTimeRange]);

  // Obtenir la couleur selon la sévérité
  const getSeverityColor = (severity: SecurityAuditLog['severity']) => {
    switch (severity) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  // Obtenir l'icône selon l'événement
  const getEventIcon = (event: string) => {
    if (event.includes('LOGIN')) return <Users className="h-4 w-4" />;
    if (event.includes('INJECTION') || event.includes('XSS')) return <AlertTriangle className="h-4 w-4" />;
    if (event.includes('BLOCKED')) return <Ban className="h-4 w-4" />;
    if (event.includes('RATE_LIMIT')) return <Clock className="h-4 w-4" />;
    return <Activity className="h-4 w-4" />;
  };

  // Exporter les logs
  const exportLogs = () => {
    const dataStr = JSON.stringify(filteredLogs, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `security-logs-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  // Nettoyer les anciens logs
  const clearOldLogs = () => {
    SecurityValidator.clearOldLogs(30);
    loadSecurityLogs();
  };

  return (
    <AdminGuard>
      <div className="container py-8 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
              <Shield className="h-8 w-8 text-red-600" />
              Dashboard de Sécurité
            </h1>
            <p className="text-muted-foreground">
              Surveillance et monitoring des événements de sécurité
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={autoRefresh ? 'bg-green-50 border-green-200' : ''}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${autoRefresh ? 'animate-spin' : ''}`} />
              {autoRefresh ? 'Auto-refresh ON' : 'Auto-refresh OFF'}
            </Button>
            <Button onClick={loadSecurityLogs} variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Actualiser
            </Button>
          </div>
        </div>

        {/* Statistiques */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Événements Total</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalEvents}</div>
              <p className="text-xs text-muted-foreground">Dernières {selectedTimeRange}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Critiques</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{stats.criticalEvents}</div>
              <p className="text-xs text-muted-foreground">Nécessitent attention</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">IPs Bloquées</CardTitle>
              <Ban className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{stats.blockedIPs}</div>
              <p className="text-xs text-muted-foreground">Accès refusés</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Connexions OK</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.successfulLogins}</div>
              <p className="text-xs text-muted-foreground">Authentifications réussies</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Échecs Connexion</CardTitle>
              <XCircle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{stats.failedLogins}</div>
              <p className="text-xs text-muted-foreground">Tentatives échouées</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Activité Suspecte</CardTitle>
              <Eye className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{stats.suspiciousActivity}</div>
              <p className="text-xs text-muted-foreground">Injections, XSS, etc.</p>
            </CardContent>
          </Card>
        </div>

        {/* Filtres et Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Filtres et Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4 items-end">
              <div className="flex-1 min-w-[200px]">
                <label className="text-sm font-medium mb-1 block">Recherche</label>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Rechercher événements, IP, détails..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">Sévérité</label>
                <select
                  value={selectedSeverity}
                  onChange={(e) => setSelectedSeverity(e.target.value)}
                  className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors"
                >
                  <option value="all">Toutes</option>
                  <option value="critical">Critiques</option>
                  <option value="high">Élevées</option>
                  <option value="medium">Moyennes</option>
                  <option value="low">Faibles</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">Période</label>
                <select
                  value={selectedTimeRange}
                  onChange={(e) => setSelectedTimeRange(e.target.value)}
                  className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors"
                >
                  <option value="1h">Dernière heure</option>
                  <option value="24h">Dernières 24h</option>
                  <option value="7d">7 derniers jours</option>
                  <option value="30d">30 derniers jours</option>
                </select>
              </div>

              <Button onClick={exportLogs} variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Exporter
              </Button>

              <Button onClick={clearOldLogs} variant="outline">
                <AlertTriangle className="h-4 w-4 mr-2" />
                Nettoyer anciens logs
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Logs de sécurité */}
        <Card>
          <CardHeader>
            <CardTitle>Logs de Sécurité ({filteredLogs.length})</CardTitle>
            <CardDescription>
              Événements de sécurité en temps réel - Actualisé {autoRefresh ? 'automatiquement' : 'manuellement'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-[600px] overflow-y-auto">
              {filteredLogs.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Shield className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Aucun événement de sécurité trouvé</p>
                  <p className="text-sm">Ajustez vos filtres ou période de recherche</p>
                </div>
              ) : (
                filteredLogs.map((log, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex-shrink-0">
                      <div className={`w-2 h-2 rounded-full ${getSeverityColor(log.severity)} mt-2`} />
                    </div>
                    
                    <div className="flex-shrink-0 p-2 bg-muted rounded-lg">
                      {getEventIcon(log.event)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-sm">{log.event.replace(/_/g, ' ')}</h4>
                        <Badge variant="outline" className={`text-xs ${getSeverityColor(log.severity)} text-white`}>
                          {log.severity}
                        </Badge>
                        {log.ip && (
                          <Badge variant="outline" className="text-xs">
                            <Globe className="h-3 w-3 mr-1" />
                            {log.ip}
                          </Badge>
                        )}
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-1">{log.details}</p>
                      
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>{new Date(log.timestamp).toLocaleString()}</span>
                        {log.userId && (
                          <span>User: {log.userId.substring(0, 8)}...</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Alertes de sécurité */}
        {stats.criticalEvents > 0 && (
          <Alert className="border-red-200 bg-red-50">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              <strong>{stats.criticalEvents} événement(s) critique(s)</strong> détecté(s) dans la période sélectionnée.
              Vérifiez immédiatement les logs ci-dessus et prenez les mesures appropriées.
            </AlertDescription>
          </Alert>
        )}

      </div>
    </AdminGuard>
  );
} 