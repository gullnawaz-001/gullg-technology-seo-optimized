import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Film, 
  Upload, 
  Link as LinkIcon, 
  Check, 
  Play, 
  Pause, 
  RotateCcw, 
  Sparkles, 
  Eye, 
  Save, 
  Info, 
  CheckCircle2, 
  Volume2, 
  VolumeX, 
  Sliders, 
  Video 
} from 'lucide-react';
import { useGlobalStore } from '../store';
import { WelcomeVideoConfig } from '../types';
import { initialWelcomeVideoConfig } from '../data';

export function AdminWelcomeVideo() {
  const { welcomeVideoConfig, setWelcomeVideoConfig } = useGlobalStore();

  const [formData, setFormData] = useState<WelcomeVideoConfig>(() => ({
    ...initialWelcomeVideoConfig,
    ...welcomeVideoConfig,
  }));

  const [sourceMode, setSourceMode] = useState<'preset' | 'upload' | 'url'>('preset');
  const [uploadedFileName, setUploadedFileName] = useState<string>('');
  const [uploadedFileSize, setUploadedFileSize] = useState<string>('');
  const [previewPlaying, setPreviewPlaying] = useState(false);
  const [previewMuted, setPreviewMuted] = useState(true);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [testPopupOpen, setTestPopupOpen] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const previewVideoRef = useRef<HTMLVideoElement>(null);

  const presets = [
    {
      name: 'GullG Technologies Official Reel',
      url: '/video/GullG-Technologies.mp4',
      badge: 'Default / Official',
      description: 'The core brand video showcasing engineering and AI capabilities.',
    },
    {
      name: 'Cheela Commercial Showcase',
      url: '/cheela-commercial.mp4',
      badge: 'Commercial Demo',
      description: 'Showcase video demonstrating client commercial work.',
    },
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setFormData(prev => ({ ...prev, popupVideoSource: url }));
      setUploadedFileName(file.name);
      setUploadedFileSize((file.size / (1024 * 1024)).toFixed(2) + ' MB');
    }
  };

  const handleSave = () => {
    setWelcomeVideoConfig(formData);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3500);
  };

  const handleResetToDefault = () => {
    setFormData(initialWelcomeVideoConfig);
    setUploadedFileName('');
    setUploadedFileSize('');
  };

  const togglePreviewPlay = () => {
    if (!previewVideoRef.current) return;
    if (previewVideoRef.current.paused) {
      previewVideoRef.current.play();
      setPreviewPlaying(true);
    } else {
      previewVideoRef.current.pause();
      setPreviewPlaying(false);
    }
  };

  const togglePreviewMute = () => {
    if (!previewVideoRef.current) return;
    const nextMuted = !previewMuted;
    previewVideoRef.current.muted = nextMuted;
    setPreviewMuted(nextMuted);
  };

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
              <Film size={20} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Welcome Video Popup</h2>
              <div className="flex items-center gap-2 mt-0.5">
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                  formData.isPopupEnabled ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${formData.isPopupEnabled ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`} />
                  {formData.isPopupEnabled ? 'Live on Site' : 'Disabled'}
                </span>
                <span className="text-xs text-slate-400">• High-Impact Overlay</span>
              </div>
            </div>
          </div>
          <p className="text-sm text-slate-600 max-w-xl">
            Configure the full-screen introductory video popup displayed to visitors when they land on the GullG Technology website.
          </p>
        </div>

        {/* Global Enable Toggle Switch */}
        <div className="flex items-center gap-4 bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200">
          <div>
            <div className="text-sm font-bold text-slate-900">Enable Popup Globally</div>
            <div className="text-xs text-slate-500">Show to new visitors on load</div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={formData.isPopupEnabled}
              onChange={(e) => setFormData(prev => ({ ...prev, isPopupEnabled: e.target.checked }))}
            />
            <div className="w-12 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
          </label>
        </div>
      </div>

      {/* Main Grid: Source & Settings vs Live Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Configuration Controls (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Media Video Source Selector */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Video Source</h3>
                <p className="text-xs text-slate-500">Choose a preset, upload a video file, or enter a direct URL</p>
              </div>
              <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-semibold">
                <button
                  onClick={() => setSourceMode('preset')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    sourceMode === 'preset' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  Presets
                </button>
                <button
                  onClick={() => setSourceMode('upload')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    sourceMode === 'upload' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  Upload File
                </button>
                <button
                  onClick={() => setSourceMode('url')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    sourceMode === 'url' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  Direct URL
                </button>
              </div>
            </div>

            {/* Presets Mode */}
            {sourceMode === 'preset' && (
              <div className="space-y-3">
                {presets.map((preset, idx) => {
                  const isSelected = formData.popupVideoSource === preset.url;
                  return (
                    <div
                      key={idx}
                      onClick={() => setFormData(prev => ({ ...prev, popupVideoSource: preset.url }))}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                        isSelected 
                          ? 'border-indigo-500 bg-indigo-50/40 ring-2 ring-indigo-500/20' 
                          : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'
                        }`}>
                          <Video size={18} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900 text-sm">{preset.name}</span>
                            <span className="text-[10px] px-2 py-0.5 bg-slate-100 font-semibold text-slate-600 rounded-md">
                              {preset.badge}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5">{preset.description}</p>
                          <span className="text-[11px] font-mono text-slate-400 mt-1 block truncate max-w-xs sm:max-w-sm">
                            {preset.url}
                          </span>
                        </div>
                      </div>
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 border ${
                        isSelected ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-slate-300'
                      }`}>
                        {isSelected && <Check size={12} />}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Upload File Mode */}
            {sourceMode === 'upload' && (
              <div className="space-y-4">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="video/mp4,video/webm,video/ogg"
                  className="hidden"
                />
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-slate-300 hover:border-indigo-500 bg-slate-50 hover:bg-indigo-50/20 rounded-2xl p-8 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-3"
                >
                  <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 text-indigo-600 flex items-center justify-center shadow-sm">
                    <Upload size={22} />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-sm">Click to upload a video file</div>
                    <p className="text-xs text-slate-500 mt-1">Supports MP4, WebM (Recommended: 1080p, H.264, &lt; 25MB)</p>
                  </div>
                  <button
                    type="button"
                    className="px-4 py-2 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl shadow-sm transition-all"
                  >
                    Browse Local Files
                  </button>
                </div>

                {uploadedFileName && (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between text-xs text-emerald-800">
                    <div className="flex items-center gap-2 truncate">
                      <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                      <span className="font-bold truncate">{uploadedFileName}</span>
                      <span className="text-emerald-600">({uploadedFileSize})</span>
                    </div>
                    <span className="font-semibold text-[11px] bg-emerald-200/60 px-2 py-0.5 rounded text-emerald-900 shrink-0">
                      Loaded in Memory
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Direct URL Mode */}
            {sourceMode === 'url' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Direct Video Source URL or Path
                  </label>
                  <div className="relative">
                    <LinkIcon size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={formData.popupVideoSource}
                      onChange={(e) => setFormData(prev => ({ ...prev, popupVideoSource: e.target.value }))}
                      placeholder="e.g. /video/GullG-Technologies.mp4 or https://cdn.example.com/intro.mp4"
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all font-mono"
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-2">
                    Enter a relative URL in the public directory or an external HTTPS video stream.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Behavior & UX Options */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-sm">
            <div className="flex items-center gap-2 mb-5">
              <Sliders size={18} className="text-slate-600" />
              <h3 className="text-lg font-bold text-slate-900">Playback & UX Behavior</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Autoplay toggle */}
              <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900 text-sm">Attempt Autoplay</div>
                  <div className="text-xs text-slate-500">Play automatically on open</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={formData.autoPlay}
                    onChange={(e) => setFormData(prev => ({ ...prev, autoPlay: e.target.checked }))}
                  />
                  <div className="w-10 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>

              {/* Audio Mute toggle (Admin only control) */}
              <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900 text-sm">Mute Video Sound</div>
                  <div className="text-xs text-slate-500">Sound is ON by default. Enable to force mute.</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={formData.muted}
                    onChange={(e) => setFormData(prev => ({ ...prev, muted: e.target.checked }))}
                  />
                  <div className="w-10 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>

              {/* Auto Close on End */}
              <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900 text-sm">Auto-Close on End</div>
                  <div className="text-xs text-slate-500">Dismiss when video completes</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={formData.closeOnEnd}
                    onChange={(e) => setFormData(prev => ({ ...prev, closeOnEnd: e.target.checked }))}
                  />
                  <div className="w-10 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>

              {/* Show Skip Button */}
              <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900 text-sm">Show Skip Button</div>
                  <div className="text-xs text-slate-500">Top-right manual close button</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={formData.showSkipButton}
                    onChange={(e) => setFormData(prev => ({ ...prev, showSkipButton: e.target.checked }))}
                  />
                  <div className="w-10 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Action Buttons: Save Changes */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <button
              onClick={handleResetToDefault}
              type="button"
              className="w-full sm:w-auto px-5 py-3 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold text-sm transition-all"
            >
              Reset to Default
            </button>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={handleSave}
                type="button"
                className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md transition-all active:scale-95 cursor-pointer"
              >
                <Save size={16} />
                Save Changes
              </button>
            </div>
          </div>

          {/* Success Alert */}
          <AnimatePresence>
            {saveSuccess && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3 text-emerald-800 text-sm font-semibold shadow-sm"
              >
                <CheckCircle2 size={20} className="text-emerald-600 shrink-0" />
                <div>
                  Welcome Video settings updated and saved successfully! Changes are live across the website.
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Column: In-Dashboard Live Preview (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-sm sticky top-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Eye size={18} className="text-slate-600" />
                <h3 className="text-lg font-bold text-slate-900">Live Video Preview</h3>
              </div>
              <span className="text-[11px] font-mono font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100">
                9:16 Vertical Reel
              </span>
            </div>

            {/* Video Player Box (9:16 aspect) */}
            <div className="relative aspect-[9/16] max-w-[280px] mx-auto rounded-3xl overflow-hidden bg-black shadow-2xl group border-0 ring-0">
              <video
                ref={previewVideoRef}
                src={formData.popupVideoSource || '/video/GullG-Technologies.mp4'}
                muted={previewMuted}
                playsInline
                className="w-full h-full object-cover"
                onEnded={() => setPreviewPlaying(false)}
              />

              {/* Overlay Play / Pause & Volume Controls */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 flex flex-col justify-between p-4 opacity-90 group-hover:opacity-100 transition-opacity">
                <div className="flex justify-between items-center text-white text-xs">
                  <span className="font-semibold flex items-center gap-1">
                    <Sparkles size={12} className="text-indigo-400" />
                    9:16 Preview
                  </span>
                  <button
                    onClick={togglePreviewMute}
                    className="p-1.5 rounded-lg bg-black/60 hover:bg-black/80 text-white backdrop-blur-sm transition-colors cursor-pointer"
                  >
                    {previewMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                  </button>
                </div>

                <div className="flex items-center justify-center">
                  <button
                    onClick={togglePreviewPlay}
                    className="w-12 h-12 rounded-full bg-white/90 hover:bg-white text-slate-900 flex items-center justify-center shadow-lg transition-transform hover:scale-110 active:scale-95 cursor-pointer"
                  >
                    {previewPlaying ? <Pause size={20} /> : <Play size={20} className="fill-slate-900 ml-0.5" />}
                  </button>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-300">
                  <span className="truncate max-w-[150px] font-mono">
                    {formData.popupVideoSource}
                  </span>
                  <span className="text-slate-400">
                    {formData.isPopupEnabled ? 'Active' : 'Disabled'}
                  </span>
                </div>
              </div>
            </div>

            {/* Preview Meta Info */}
            <div className="mt-5 space-y-3">
              <div className="flex justify-between text-xs py-2 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Layout</span>
                <span className="font-bold text-slate-900">9:16 Borderless (Tap to Skip)</span>
              </div>
              <div className="flex justify-between text-xs py-2 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Status</span>
                <span className={`font-bold ${formData.isPopupEnabled ? 'text-emerald-600' : 'text-slate-500'}`}>
                  {formData.isPopupEnabled ? 'Active on initial visit' : 'Disabled globally'}
                </span>
              </div>
              <div className="flex justify-between text-xs py-2 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Autoplay</span>
                <span className="font-bold text-slate-900">{formData.autoPlay ? 'Yes' : 'No'}</span>
              </div>
              <div className="flex justify-between text-xs py-2">
                <span className="text-slate-500 font-medium">Auto-Close</span>
                <span className="font-bold text-slate-900">{formData.closeOnEnd ? 'Enabled' : 'Disabled'}</span>
              </div>
            </div>

            {/* Test Live Experience Button */}
            <div className="mt-6 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => {
                  sessionStorage.removeItem('gullg_welcome_video_seen');
                  setTestPopupOpen(true);
                }}
                className="w-full py-3 px-4 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Eye size={15} />
                Test Full-Screen Overlay UX
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Test Modal (Allows Admin to preview the exact 9:16 vertical experience inside the admin panel) */}
      <AnimatePresence>
        {testPopupOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setTestPopupOpen(false)}
            className="fixed inset-0 z-[999999] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-2xl cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={() => setTestPopupOpen(false)}
              className="relative h-[86vh] max-h-[780px] aspect-[9/16] bg-black rounded-3xl overflow-hidden shadow-2xl border-0 ring-0 cursor-pointer"
            >
              <video
                src={formData.popupVideoSource || '/video/GullG-Technologies.mp4'}
                autoPlay
                className="w-full h-full object-cover"
                onEnded={() => {
                  if (formData.closeOnEnd) {
                    setTestPopupOpen(false);
                  }
                }}
              />
              <div className="absolute bottom-4 inset-x-0 text-center">
                <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-xs text-white/70">
                  Tap anywhere to close test
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
