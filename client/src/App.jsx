import React, { useState, useEffect } from 'react';
import { 
  getMasterReport, 
  addRequirement, 
  addChangeRequest, 
  addActivity, 
  calculateEVM, 
  addQualityRisk,
  getCharter,
  saveCharter
} from './services/api';

function App() {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  // Charter State
  const [charterForm, setCharterForm] = useState({
    objectives: 'Manage patient appointments, lab reports, doctor schedules, online consultations, and billing across 5 hospitals.',
    stakeholders: 'Hospital Management, Project Manager, 2 Backend Devs, 2 Frontend Devs, 1 DB Dev, 1 QA Engineer.',
    scopeBoundaries: 'Includes 5-hospital network, AI Diagnosis module, and Mobile App. Excludes third-party hardware supply.'
  });

  // Form States
  const [reqForm, setReqForm] = useState({ requirementName: '', description: '', priority: 'High' });
  const [changeForm, setChangeForm] = useState({ changeTitle: '', justification: '', costImpact: '', scheduleImpactWeeks: '' });
  const [activityForm, setActivityForm] = useState({ activityName: '', assignedTo: '', durationWeeks: '', dependencies: '' });
  const [evmForm, setEvmForm] = useState({ plannedValuePV: '', earnedValueEV: '', actualCostAC: '' });
  const [evmResult, setEvmResult] = useState(null);
  const [qualityForm, setQualityForm] = useState({ moduleType: 'Defect', title: '', severityOrLikelihood: 'High', assignedToOrImpact: '' });

  const fetchReport = async () => {
    try {
      const res = await getMasterReport();
      setReport(res.data);
      const charterRes = await getCharter();
      if (charterRes.data) setCharterForm(charterRes.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReport();
  }, []);

  const handleCharterSubmit = async (e) => {
    e.preventDefault();
    await saveCharter(charterForm);
    alert("Project Charter saved successfully!");
    fetchReport();
  };

  const handleAddReq = async (e) => {
    e.preventDefault();
    await addRequirement(reqForm);
    setReqForm({ requirementName: '', description: '', priority: 'High' });
    fetchReport();
  };

  const handleAddChange = async (e) => {
    e.preventDefault();
    await addChangeRequest({
      ...changeForm,
      costImpact: Number(changeForm.costImpact),
      scheduleImpactWeeks: Number(changeForm.scheduleImpactWeeks)
    });
    setChangeForm({ changeTitle: '', justification: '', costImpact: '', scheduleImpactWeeks: '' });
    fetchReport();
  };

  const handleAddActivity = async (e) => {
    e.preventDefault();
    await addActivity({ ...activityForm, durationWeeks: Number(activityForm.durationWeeks) });
    setActivityForm({ activityName: '', assignedTo: '', durationWeeks: '', dependencies: '' });
    fetchReport();
  };

  const handleCalculateEVM = async (e) => {
    e.preventDefault();
    const res = await calculateEVM({
      plannedValuePV: Number(evmForm.plannedValuePV),
      earnedValueEV: Number(evmForm.earnedValueEV),
      actualCostAC: Number(evmForm.actualCostAC)
    });
    setEvmResult(res.data);
    fetchReport();
  };

  const handleAddQuality = async (e) => {
    e.preventDefault();
    await addQualityRisk(qualityForm);
    setQualityForm({ moduleType: 'Defect', title: '', severityOrLikelihood: 'High', assignedToOrImpact: '' });
    fetchReport();
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-sky-50 text-sky-700 font-medium">
      Loading Healthcare PM Dashboard...
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      {/* Header */}
      <header className="bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">🏥 Smart Healthcare Project Management System</h1>
            <p className="text-sky-100 text-sm mt-1">5-Hospital System | Budget: PKR 5,000,000 | 16-Week Deadline</p>
          </div>
          <span className="bg-sky-400/30 text-white text-xs px-3.5 py-1.5 rounded-full font-semibold border border-sky-300/40 backdrop-blur-sm">
            MERN Stack System
          </span>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-6 py-3 flex flex-wrap gap-2">
          {[
            { id: 'overview', label: '📊 Overview' },
            { id: 'charter', label: '📋 Module 1: Charter' },
            { id: 'requirements', label: '📝 Module 2: Requirements' },
            { id: 'changes', label: '🔄 Change Requests' },
            { id: 'activities', label: '📅 Module 3: WBS & Timeline' },
            { id: 'evm', label: '💰 Module 4: Cost & EVM' },
            { id: 'quality', label: '🛡️ Module 5: Quality & Risks' },
            { id: 'report', label: '📈 Module 6: Master Report' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-3.5 font-medium text-xs md:text-sm rounded-lg transition-all ${
                activeTab === tab.id
                  ? 'bg-sky-500 text-white shadow-xs font-semibold'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-6 py-8">

        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
                <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Total Requirements</p>
                <p className="text-3xl font-bold text-sky-600 mt-2">{report?.totalRequirements || 0}</p>
              </div>
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
                <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Change Requests</p>
                <p className="text-3xl font-bold text-amber-500 mt-2">{report?.totalChangeRequests || 0}</p>
              </div>
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
                <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold">WBS Activities</p>
                <p className="text-3xl font-bold text-emerald-600 mt-2">{report?.totalActivities || 0}</p>
              </div>
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
                <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Quality & Risk Logs</p>
                <p className="text-3xl font-bold text-rose-500 mt-2">{report?.totalQualityRisks || 0}</p>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
              <h2 className="text-lg font-bold text-slate-800 mb-4">Project Overview & Specs</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="bg-sky-50/50 p-4 rounded-lg border border-sky-100">
                  <span className="font-semibold text-sky-900 block mb-1">Scope:</span> 
                  <span className="text-slate-600">5-Hospital Integrated Healthcare System</span>
                </div>
                <div className="bg-sky-50/50 p-4 rounded-lg border border-sky-100">
                  <span className="font-semibold text-sky-900 block mb-1">Approved Budget:</span> 
                  <span className="text-slate-600">PKR 5,000,000</span>
                </div>
                <div className="bg-sky-50/50 p-4 rounded-lg border border-sky-100">
                  <span className="font-semibold text-sky-900 block mb-1">Duration:</span> 
                  <span className="text-slate-600">16 Weeks (+3 weeks extension)</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MODULE 1: PROJECT CHARTER TAB */}
        {activeTab === 'charter' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
              <h2 className="text-lg font-bold text-slate-800 mb-4">Module 1: Project Charter & Integration Management</h2>
              <form onSubmit={handleCharterSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">Project Objectives</label>
                  <textarea
                    rows="3"
                    value={charterForm.objectives}
                    onChange={(e) => setCharterForm({ ...charterForm, objectives: e.target.value })}
                    required
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-400 text-sm bg-slate-50/50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">Stakeholders</label>
                  <input
                    type="text"
                    value={charterForm.stakeholders}
                    onChange={(e) => setCharterForm({ ...charterForm, stakeholders: e.target.value })}
                    required
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-400 text-sm bg-slate-50/50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">Scope Boundaries</label>
                  <textarea
                    rows="2"
                    value={charterForm.scopeBoundaries}
                    onChange={(e) => setCharterForm({ ...charterForm, scopeBoundaries: e.target.value })}
                    required
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-400 text-sm bg-slate-50/50"
                  />
                </div>
                <button type="submit" className="bg-sky-500 hover:bg-sky-600 text-white font-medium px-6 py-2.5 rounded-lg text-sm transition-colors shadow-xs">
                  Save Charter
                </button>
              </form>
            </div>
          </div>
        )}

        {/* REQUIREMENTS TAB */}
        {activeTab === 'requirements' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
              <h2 className="text-lg font-bold text-slate-800 mb-4">Module 2: Add Requirement</h2>
              <form onSubmit={handleAddReq} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="text"
                  placeholder="Requirement Name"
                  value={reqForm.requirementName}
                  onChange={(e) => setReqForm({ ...reqForm, requirementName: e.target.value })}
                  required
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-400 text-sm bg-slate-50/50"
                />
                <input
                  type="text"
                  placeholder="Description"
                  value={reqForm.description}
                  onChange={(e) => setReqForm({ ...reqForm, description: e.target.value })}
                  required
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-400 text-sm bg-slate-50/50"
                />
                <div className="flex gap-2">
                  <select
                    value={reqForm.priority}
                    onChange={(e) => setReqForm({ ...reqForm, priority: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-400 text-sm bg-slate-50/50"
                  >
                    <option value="High">High Priority</option>
                    <option value="Medium">Medium Priority</option>
                    <option value="Low">Low Priority</option>
                  </select>
                  <button type="submit" className="bg-sky-500 hover:bg-sky-600 text-white font-medium px-6 py-2.5 rounded-lg text-sm transition-colors shadow-xs whitespace-nowrap">
                    Add
                  </button>
                </div>
              </form>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
              <div className="p-6 border-b border-slate-200">
                <h2 className="text-lg font-bold text-slate-800">Requirements List</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                    <tr>
                      <th className="p-4">Requirement</th>
                      <th className="p-4">Description</th>
                      <th className="p-4">Priority</th>
                      <th className="p-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {report?.requirements?.length > 0 ? (
                      report.requirements.map((r) => (
                        <tr key={r._id} className="hover:bg-sky-50/30 transition-colors">
                          <td className="p-4 font-medium text-slate-800">{r.requirementName}</td>
                          <td className="p-4 text-slate-600">{r.description}</td>
                          <td className="p-4">
                            <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                              r.priority === 'High' ? 'bg-rose-50 text-rose-600 border border-rose-100' : 'bg-slate-100 text-slate-600'
                            }`}>
                              {r.priority}
                            </span>
                          </td>
                          <td className="p-4 text-slate-600">{r.status}</td>
                        </tr>
                      ))
                    ) : (
                      <tr><td colSpan="4" className="p-4 text-slate-400 text-center">No requirements recorded yet.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* CHANGE REQUESTS TAB */}
        {activeTab === 'changes' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
              <h2 className="text-lg font-bold text-slate-800 mb-4">Module 2: Log Change Request (AI Module & Mobile App)</h2>
              <form onSubmit={handleAddChange} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Change Title (e.g. AI Diagnosis Module)"
                  value={changeForm.changeTitle}
                  onChange={(e) => setChangeForm({ ...changeForm, changeTitle: e.target.value })}
                  required
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-400 text-sm bg-slate-50/50"
                />
                <input
                  type="text"
                  placeholder="Justification"
                  value={changeForm.justification}
                  onChange={(e) => setChangeForm({ ...changeForm, justification: e.target.value })}
                  required
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-400 text-sm bg-slate-50/50"
                />
                <input
                  type="number"
                  placeholder="Cost Impact (PKR)"
                  value={changeForm.costImpact}
                  onChange={(e) => setChangeForm({ ...changeForm, costImpact: e.target.value })}
                  required
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-400 text-sm bg-slate-50/50"
                />
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Schedule Impact (Weeks)"
                    value={changeForm.scheduleImpactWeeks}
                    onChange={(e) => setChangeForm({ ...changeForm, scheduleImpactWeeks: e.target.value })}
                    required
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-400 text-sm bg-slate-50/50"
                  />
                  <button type="submit" className="bg-amber-500 hover:bg-amber-600 text-white font-medium px-6 py-2.5 rounded-lg text-sm transition-colors shadow-xs whitespace-nowrap">
                    Submit Request
                  </button>
                </div>
              </form>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
              <div className="p-6 border-b border-slate-200">
                <h2 className="text-lg font-bold text-slate-800">Change Logs</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                    <tr>
                      <th className="p-4">Title</th>
                      <th className="p-4">Justification</th>
                      <th className="p-4">Cost Impact (PKR)</th>
                      <th className="p-4">Time Impact</th>
                      <th className="p-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {report?.changes?.length > 0 ? (
                      report.changes.map((c) => (
                        <tr key={c._id} className="hover:bg-sky-50/30 transition-colors">
                          <td className="p-4 font-medium text-slate-800">{c.changeTitle}</td>
                          <td className="p-4 text-slate-600">{c.justification}</td>
                          <td className="p-4 font-semibold text-amber-600">+PKR {c.costImpact.toLocaleString()}</td>
                          <td className="p-4 text-slate-600">+{c.scheduleImpactWeeks} Weeks</td>
                          <td className="p-4 text-slate-600">{c.approvalStatus}</td>
                        </tr>
                      ))
                    ) : (
                      <tr><td colSpan="5" className="p-4 text-slate-400 text-center">No change requests logged.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* WBS & SCHEDULE / GANTT TIMELINE TAB */}
        {activeTab === 'activities' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
              <h2 className="text-lg font-bold text-slate-800 mb-4">Module 3: Add WBS Task / Activity</h2>
              <form onSubmit={handleAddActivity} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <input
                  type="text"
                  placeholder="Task Name"
                  value={activityForm.activityName}
                  onChange={(e) => setActivityForm({ ...activityForm, activityName: e.target.value })}
                  required
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-400 text-sm bg-slate-50/50"
                />
                <input
                  type="text"
                  placeholder="Assigned Role"
                  value={activityForm.assignedTo}
                  onChange={(e) => setActivityForm({ ...activityForm, assignedTo: e.target.value })}
                  required
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-400 text-sm bg-slate-50/50"
                />
                <input
                  type="number"
                  placeholder="Duration (Weeks)"
                  value={activityForm.durationWeeks}
                  onChange={(e) => setActivityForm({ ...activityForm, durationWeeks: e.target.value })}
                  required
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-400 text-sm bg-slate-50/50"
                />
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Dependency"
                    value={activityForm.dependencies}
                    onChange={(e) => setActivityForm({ ...activityForm, dependencies: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-400 text-sm bg-slate-50/50"
                  />
                  <button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-5 py-2.5 rounded-lg text-sm transition-colors shadow-xs whitespace-nowrap">
                    Add
                  </button>
                </div>
              </form>
            </div>

            {/* Gantt-Style Visual Timeline View */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
              <h2 className="text-lg font-bold text-slate-800 mb-4">Gantt-Style Visual Timeline</h2>
              <div className="space-y-3">
                {report?.activities?.length > 0 ? (
                  report.activities.map((a, index) => (
                    <div key={a._id} className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                      <div className="flex justify-between text-xs font-semibold text-slate-600 mb-1">
                        <span>{index + 1}. {a.activityName} ({a.assignedTo})</span>
                        <span>{a.durationWeeks} Weeks</span>
                      </div>
                      <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden">
                        <div 
                          className="bg-sky-500 h-full rounded-full transition-all" 
                          style={{ width: `${Math.min(a.durationWeeks * 15, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-slate-400 text-sm text-center py-4">No activities available for timeline.</p>
                )}
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
              <div className="p-6 border-b border-slate-200">
                <h2 className="text-lg font-bold text-slate-800">WBS Activities List</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                    <tr>
                      <th className="p-4">Task Name</th>
                      <th className="p-4">Assigned To</th>
                      <th className="p-4">Duration</th>
                      <th className="p-4">Dependency</th>
                      <th className="p-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {report?.activities?.length > 0 ? (
                      report.activities.map((a) => (
                        <tr key={a._id} className="hover:bg-sky-50/30 transition-colors">
                          <td className="p-4 font-medium text-slate-800">{a.activityName}</td>
                          <td className="p-4 text-slate-600">{a.assignedTo}</td>
                          <td className="p-4 text-slate-600">{a.durationWeeks} Weeks</td>
                          <td className="p-4 text-slate-600">{a.dependencies || 'None'}</td>
                          <td className="p-4 text-slate-600">{a.status}</td>
                        </tr>
                      ))
                    ) : (
                      <tr><td colSpan="5" className="p-4 text-slate-400 text-center">No WBS tasks added yet.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* COST & EVM TAB */}
        {activeTab === 'evm' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
              <h2 className="text-lg font-bold text-slate-800 mb-4">Module 4: Earned Value Analysis (EVM) Calculator[cite: 8]</h2>
              <form onSubmit={handleCalculateEVM} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">Planned Value (PV)</label>
                  <input
                    type="number"
                    placeholder="e.g. 2000000"
                    value={evmForm.plannedValuePV}
                    onChange={(e) => setEvmForm({ ...evmForm, plannedValuePV: e.target.value })}
                    required
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-400 text-sm bg-slate-50/50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">Earned Value (EV)</label>
                  <input
                    type="number"
                    placeholder="e.g. 1800000"
                    value={evmForm.earnedValueEV}
                    onChange={(e) => setEvmForm({ ...evmForm, earnedValueEV: e.target.value })}
                    required
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-400 text-sm bg-slate-50/50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">Actual Cost (AC)</label>
                  <input
                    type="number"
                    placeholder="e.g. 2100000"
                    value={evmForm.actualCostAC}
                    onChange={(e) => setEvmForm({ ...evmForm, actualCostAC: e.target.value })}
                    required
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-400 text-sm bg-slate-50/50"
                  />
                </div>
                <div className="md:col-span-3">
                  <button type="submit" className="bg-sky-500 hover:bg-sky-600 text-white font-medium px-6 py-2.5 rounded-lg text-sm transition-colors shadow-xs">
                    Calculate Metrics
                  </button>
                </div>
              </form>

              {evmResult && (
                <div className="mt-6 pt-6 border-t border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-sky-50/40 p-4 rounded-lg border border-sky-100">
                    <p className="text-sm font-semibold text-slate-700">Cost Performance Index (CPI): <span className="text-sky-600 font-bold">{evmResult.metrics.CPI}</span></p>
                    <p className="text-sm font-semibold text-slate-700 mt-2">Schedule Performance Index (SPI): <span className="text-sky-600 font-bold">{evmResult.metrics.SPI}</span></p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                    <p className="text-xs font-bold text-slate-500 uppercase mb-2">Automated Alerts</p>
                    {evmResult.warnings.length > 0 ? (
                      evmResult.warnings.map((w, idx) => (
                        <p key={idx} className="text-xs font-semibold text-rose-600 mb-1">⚠️ {w}</p>
                      ))
                    ) : (
                      <p className="text-xs font-semibold text-emerald-600">✔ Project performance is on track.</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* QUALITY & RISKS TAB */}
        {activeTab === 'quality' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
              <h2 className="text-lg font-bold text-slate-800 mb-4">Module 5: Log Defect or Risk[cite: 8]</h2>
              <form onSubmit={handleAddQuality} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <select
                  value={qualityForm.moduleType}
                  onChange={(e) => setQualityForm({ ...qualityForm, moduleType: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-400 text-sm bg-slate-50/50"
                >
                  <option value="Defect">Quality Defect</option>
                  <option value="Risk">Project Risk</option>
                </select>
                <input
                  type="text"
                  placeholder="Title / Description"
                  value={qualityForm.title}
                  onChange={(e) => setQualityForm({ ...qualityForm, title: e.target.value })}
                  required
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-400 text-sm bg-slate-50/50"
                />
                <select
                  value={qualityForm.severityOrLikelihood}
                  onChange={(e) => setQualityForm({ ...qualityForm, severityOrLikelihood: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-400 text-sm bg-slate-50/50"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Critical">Critical</option>
                </select>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Impact / Assigned QA"
                    value={qualityForm.assignedToOrImpact}
                    onChange={(e) => setQualityForm({ ...qualityForm, assignedToOrImpact: e.target.value })}
                    required
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-400 text-sm bg-slate-50/50"
                  />
                  <button type="submit" className="bg-rose-500 hover:bg-rose-600 text-white font-medium px-5 py-2.5 rounded-lg text-sm transition-colors shadow-xs whitespace-nowrap">
                    Log Item
                  </button>
                </div>
              </form>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
              <div className="p-6 border-b border-slate-200">
                <h2 className="text-lg font-bold text-slate-800">Quality Defect & Risk Register</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                    <tr>
                      <th className="p-4">Type</th>
                      <th className="p-4">Title</th>
                      <th className="p-4">Severity / Likelihood</th>
                      <th className="p-4">Assigned / Impact</th>
                      <th className="p-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {report?.qualityRisks?.length > 0 ? (
                      report.qualityRisks.map((q) => (
                        <tr key={q._id} className="hover:bg-sky-50/30 transition-colors">
                          <td className="p-4 font-semibold text-slate-700">{q.moduleType}</td>
                          <td className="p-4 text-slate-800 font-medium">{q.title}</td>
                          <td className="p-4">
                            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-600 border border-rose-100">
                              {q.severityOrLikelihood}
                            </span>
                          </td>
                          <td className="p-4 text-slate-600">{q.assignedToOrImpact}</td>
                          <td className="p-4 text-slate-600">{q.status}</td>
                        </tr>
                      ))
                    ) : (
                      <tr><td colSpan="5" className="p-4 text-slate-400 text-center">No defects or risks logged.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* MODULE 6: MASTER REPORT & INTEGRATION TAB */}
        {activeTab === 'report' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
              <h2 className="text-lg font-bold text-slate-800 mb-2">Module 6: System Integration, Validation & Master Report</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-sky-50/50 p-4 rounded-lg border border-sky-100">
                  <p className="text-xs font-bold text-sky-900 uppercase mb-2">Project Summary Statistics</p>
                  <p className="text-sm text-slate-700">Total Requirements: <span className="font-bold">{report?.totalRequirements || 0}</span></p>
                  <p className="text-sm text-slate-700 mt-1">Change Requests: <span className="font-bold">{report?.totalChangeRequests || 0}</span></p>
                  <p className="text-sm text-slate-700 mt-1">WBS Activities: <span className="font-bold">{report?.totalActivities || 0}</span></p>
                  <p className="text-sm text-slate-700 mt-1">Quality Defects / Risks: <span className="font-bold">{report?.totalQualityRisks || 0}</span></p>
                </div>

                <div className="bg-amber-50/50 p-4 rounded-lg border border-amber-100">
                  <p className="text-xs font-bold text-amber-900 uppercase mb-2">Case Study Impact Status</p>
                  <p className="text-sm text-slate-700">Budget Impact: <span className="font-bold text-amber-700">+PKR 800,000</span></p>
                  <p className="text-sm text-slate-700 mt-1">Timeline Impact: <span className="font-bold text-amber-700">+3 Weeks Extension</span></p>
                  <p className="text-sm text-slate-700 mt-1">Integration Status: <span className="font-bold text-emerald-600">✔ Fully Connected via MongoDB</span></p>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}

export default App;