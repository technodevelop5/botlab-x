import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronLeft, Check, Upload, Link as LinkIcon, Eye } from 'lucide-react';
import '../styles/experiments.css';

const CreateExperiment = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: General Info
    name: '',
    description: '',
    category: '',
    
    // Step 2: Demographics
    ageMin: '',
    ageMax: '',
    gender: [],
    regions: [],
    customFields: [],
    
    // Step 3: Survey Selection
    surveys: [],
    customSurvey: '',
    
    // Step 4: Randomization
    conditions: ['Condition A'],
    randomAssignment: true,
    
    // Step 5: Chatbot Integration
    chatbotType: 'external',
    chatbotUrl: '',
    selectedChatbot: ''
  });

  const steps = [
    { number: 1, title: 'General Info', icon: '📋' },
    { number: 2, title: 'Demographics', icon: '👥' },
    { number: 3, title: 'Survey Selection', icon: '📝' },
    { number: 4, title: 'Randomization', icon: '🎲' },
    { number: 5, title: 'Chatbot Integration', icon: '🤖' },
    { number: 6, title: 'Preview & Publish', icon: '🚀' }
  ];

  const categories = ['Chatbot', 'Web', 'Mobile', 'Voice UI', 'Desktop', 'Other'];
  const surveyOptions = ['SUS', 'CUQ', 'AttrakDiff', 'NASA-TLX', 'UEQ'];
  const regionOptions = ['North America', 'Europe', 'Asia', 'South America', 'Africa', 'Oceania'];

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    console.log('Experiment Data:', formData);
    alert('Experiment created successfully!');
    navigate('/experiments');
  };

  const updateFormData = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const toggleArrayValue = (field, value) => {
    const current = formData[field];
    if (current.includes(value)) {
      updateFormData(field, current.filter(v => v !== value));
    } else {
      updateFormData(field, [...current, value]);
    }
  };

  const addCondition = () => {
    const newCondition = `Condition ${String.fromCharCode(65 + formData.conditions.length)}`;
    updateFormData('conditions', [...formData.conditions, newCondition]);
  };

  const removeCondition = (index) => {
    updateFormData('conditions', formData.conditions.filter((_, i) => i !== index));
  };

  const addCustomField = () => {
    const fieldName = prompt('Enter custom field name:');
    if (fieldName) {
      updateFormData('customFields', [...formData.customFields, { name: fieldName, value: '' }]);
    }
  };

  return (
    <div className="create-experiment-container">
      {/* Progress Bar */}
      <div className="wizard-progress">
        {steps.map((step, index) => (
          <div key={step.number} className="progress-step-wrapper">
            <div 
              className={`progress-step ${currentStep >= step.number ? 'active' : ''} ${currentStep === step.number ? 'current' : ''}`}
              onClick={() => setCurrentStep(step.number)}
            >
              <div className="step-icon">
                {currentStep > step.number ? <Check className="w-5 h-5" /> : <span>{step.icon}</span>}
              </div>
              <div className="step-info">
                <div className="step-number">Step {step.number}</div>
                <div className="step-title">{step.title}</div>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div className={`progress-line ${currentStep > step.number ? 'completed' : ''}`} />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <div className="wizard-content">
        
        {/* Step 1: General Info */}
        {currentStep === 1 && (
          <div className="wizard-step fade-in">
            <h2 className="step-heading">General Information</h2>
            <p className="step-description">Provide basic details about your experiment</p>
            
            <div className="form-section">
              <div className="form-group">
                <label className="form-label required">Experiment Name</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g., Hotel Booking Chatbot UX Study"
                  value={formData.name}
                  onChange={(e) => updateFormData('name', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label required">Description</label>
                <textarea
                  className="form-textarea"
                  rows="4"
                  placeholder="Describe the purpose and goals of this experiment..."
                  value={formData.description}
                  onChange={(e) => updateFormData('description', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label required">Category</label>
                <select
                  className="form-select"
                  value={formData.category}
                  onChange={(e) => updateFormData('category', e.target.value)}
                >
                  <option value="">Select a category</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Demographics */}
        {currentStep === 2 && (
          <div className="wizard-step fade-in">
            <h2 className="step-heading">Demographics</h2>
            <p className="step-description">Define your target participant characteristics</p>
            
            <div className="form-section">
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Minimum Age</label>
                  <input
                    type="number"
                    className="form-input"
                    placeholder="18"
                    value={formData.ageMin}
                    onChange={(e) => updateFormData('ageMin', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Maximum Age</label>
                  <input
                    type="number"
                    className="form-input"
                    placeholder="65"
                    value={formData.ageMax}
                    onChange={(e) => updateFormData('ageMax', e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Gender</label>
                <div className="checkbox-group">
                  {['Male', 'Female', 'Non-binary', 'Prefer not to say', 'Other'].map(gender => (
                    <label key={gender} className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={formData.gender.includes(gender)}
                        onChange={() => toggleArrayValue('gender', gender)}
                      />
                      <span>{gender}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Regions</label>
                <div className="checkbox-group">
                  {regionOptions.map(region => (
                    <label key={region} className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={formData.regions.includes(region)}
                        onChange={() => toggleArrayValue('regions', region)}
                      />
                      <span>{region}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Custom Demographics Fields</label>
                <button onClick={addCustomField} className="btn-secondary-small">
                  + Add Custom Field
                </button>
                {formData.customFields.map((field, index) => (
                  <div key={index} className="custom-field-item">
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Field name"
                      value={field.name}
                      readOnly
                    />
                    <button 
                      onClick={() => updateFormData('customFields', formData.customFields.filter((_, i) => i !== index))}
                      className="btn-remove"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Survey Selection */}
        {currentStep === 3 && (
          <div className="wizard-step fade-in">
            <h2 className="step-heading">Survey Selection</h2>
            <p className="step-description">Choose validated questionnaires for your study</p>
            
            <div className="form-section">
              <div className="form-group">
                <label className="form-label">Select Surveys</label>
                <div className="survey-grid">
                  {surveyOptions.map(survey => (
                    <div
                      key={survey}
                      className={`survey-card ${formData.surveys.includes(survey) ? 'selected' : ''}`}
                      onClick={() => toggleArrayValue('surveys', survey)}
                    >
                      <div className="survey-check">
                        {formData.surveys.includes(survey) && <Check className="w-5 h-5" />}
                      </div>
                      <h4 className="survey-name">{survey}</h4>
                      <p className="survey-description">
                        {survey === 'SUS' && 'System Usability Scale - 10 questions'}
                        {survey === 'CUQ' && 'Computer Usability Questionnaire - 20 questions'}
                        {survey === 'AttrakDiff' && 'Hedonic & Pragmatic Quality - 28 questions'}
                        {survey === 'NASA-TLX' && 'Task Load Index - 6 dimensions'}
                        {survey === 'UEQ' && 'User Experience Questionnaire - 26 items'}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Custom Survey (Optional)</label>
                <textarea
                  className="form-textarea"
                  rows="3"
                  placeholder="Add custom survey questions or notes..."
                  value={formData.customSurvey}
                  onChange={(e) => updateFormData('customSurvey', e.target.value)}
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Randomization */}
        {currentStep === 4 && (
          <div className="wizard-step fade-in">
            <h2 className="step-heading">Randomization & Conditions</h2>
            <p className="step-description">Set up experimental conditions and randomization</p>
            
            <div className="form-section">
              <div className="form-group">
                <label className="form-label">Experimental Conditions</label>
                <div className="conditions-list">
                  {formData.conditions.map((condition, index) => (
                    <div key={index} className="condition-item">
                      <input
                        type="text"
                        className="form-input"
                        value={condition}
                        onChange={(e) => {
                          const newConditions = [...formData.conditions];
                          newConditions[index] = e.target.value;
                          updateFormData('conditions', newConditions);
                        }}
                      />
                      {formData.conditions.length > 1 && (
                        <button 
                          onClick={() => removeCondition(index)}
                          className="btn-remove"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <button onClick={addCondition} className="btn-secondary-small">
                  + Add Condition
                </button>
              </div>

              <div className="form-group">
                <label className="toggle-label">
                  <input
                    type="checkbox"
                    checked={formData.randomAssignment}
                    onChange={(e) => updateFormData('randomAssignment', e.target.checked)}
                    className="toggle-input"
                  />
                  <span className="toggle-slider"></span>
                  <span className="toggle-text">
                    Random Assignment
                    <span className="toggle-description">
                      Automatically assign participants to conditions randomly
                    </span>
                  </span>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Step 5: Chatbot Integration */}
        {currentStep === 5 && (
          <div className="wizard-step fade-in">
            <h2 className="step-heading">Chatbot Integration</h2>
            <p className="step-description">Connect your chatbot to the experiment</p>
            
            <div className="form-section">
              <div className="chatbot-type-selector">
                <div 
                  className={`chatbot-option ${formData.chatbotType === 'external' ? 'selected' : ''}`}
                  onClick={() => updateFormData('chatbotType', 'external')}
                >
                  <LinkIcon className="w-8 h-8" />
                  <h4>External URL</h4>
                  <p>Use a chatbot hosted externally</p>
                </div>
                <div 
                  className={`chatbot-option ${formData.chatbotType === 'internal' ? 'selected' : ''}`}
                  onClick={() => updateFormData('chatbotType', 'internal')}
                >
                  <Upload className="w-8 h-8" />
                  <h4>Built-in Editor</h4>
                  <p>Select a chatbot from your library</p>
                </div>
              </div>

              {formData.chatbotType === 'external' && (
                <div className="form-group">
                  <label className="form-label">Chatbot URL</label>
                  <input
                    type="url"
                    className="form-input"
                    placeholder="https://your-chatbot-url.com"
                    value={formData.chatbotUrl}
                    onChange={(e) => updateFormData('chatbotUrl', e.target.value)}
                  />
                </div>
              )}

              {formData.chatbotType === 'internal' && (
                <div className="form-group">
                  <label className="form-label">Select Chatbot</label>
                  <select
                    className="form-select"
                    value={formData.selectedChatbot}
                    onChange={(e) => updateFormData('selectedChatbot', e.target.value)}
                  >
                    <option value="">Choose from your chatbots...</option>
                    <option value="hotel-booking">Hotel Booking Bot</option>
                    <option value="customer-support">Customer Support Bot</option>
                    <option value="survey-bot">Survey Collection Bot</option>
                  </select>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Step 6: Preview & Publish */}
        {currentStep === 6 && (
          <div className="wizard-step fade-in">
            <h2 className="step-heading">Preview & Publish</h2>
            <p className="step-description">Review your experiment configuration</p>
            
            <div className="preview-section">
              <div className="preview-card">
                <h3 className="preview-heading">General Information</h3>
                <div className="preview-row">
                  <span className="preview-label">Name:</span>
                  <span className="preview-value">{formData.name || 'Not set'}</span>
                </div>
                <div className="preview-row">
                  <span className="preview-label">Description:</span>
                  <span className="preview-value">{formData.description || 'Not set'}</span>
                </div>
                <div className="preview-row">
                  <span className="preview-label">Category:</span>
                  <span className="preview-value">{formData.category || 'Not set'}</span>
                </div>
              </div>

              <div className="preview-card">
                <h3 className="preview-heading">Demographics</h3>
                <div className="preview-row">
                  <span className="preview-label">Age Range:</span>
                  <span className="preview-value">
                    {formData.ageMin && formData.ageMax 
                      ? `${formData.ageMin} - ${formData.ageMax}` 
                      : 'No restriction'}
                  </span>
                </div>
                <div className="preview-row">
                  <span className="preview-label">Gender:</span>
                  <span className="preview-value">
                    {formData.gender.length > 0 ? formData.gender.join(', ') : 'All'}
                  </span>
                </div>
                <div className="preview-row">
                  <span className="preview-label">Regions:</span>
                  <span className="preview-value">
                    {formData.regions.length > 0 ? formData.regions.join(', ') : 'All'}
                  </span>
                </div>
              </div>

              <div className="preview-card">
                <h3 className="preview-heading">Surveys</h3>
                <div className="preview-row">
                  <span className="preview-label">Selected:</span>
                  <span className="preview-value">
                    {formData.surveys.length > 0 ? formData.surveys.join(', ') : 'None'}
                  </span>
                </div>
              </div>

              <div className="preview-card">
                <h3 className="preview-heading">Conditions</h3>
                <div className="preview-row">
                  <span className="preview-label">Total:</span>
                  <span className="preview-value">{formData.conditions.length}</span>
                </div>
                <div className="preview-row">
                  <span className="preview-label">Random Assignment:</span>
                  <span className="preview-value">{formData.randomAssignment ? 'Yes' : 'No'}</span>
                </div>
              </div>

              <div className="preview-card">
                <h3 className="preview-heading">Chatbot</h3>
                <div className="preview-row">
                  <span className="preview-label">Type:</span>
                  <span className="preview-value">
                    {formData.chatbotType === 'external' ? 'External URL' : 'Built-in Editor'}
                  </span>
                </div>
                <div className="preview-row">
                  <span className="preview-label">Source:</span>
                  <span className="preview-value">
                    {formData.chatbotType === 'external' 
                      ? formData.chatbotUrl || 'Not set'
                      : formData.selectedChatbot || 'Not selected'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="wizard-actions">
          {currentStep > 1 && (
            <button onClick={handlePrevious} className="btn-secondary">
              <ChevronLeft className="w-5 h-5" />
              Previous
            </button>
          )}
          <div className="spacer"></div>
          {currentStep < steps.length ? (
            <button onClick={handleNext} className="btn-primary">
              Next
              <ChevronRight className="w-5 h-5" />
            </button>
          ) : (
            <button onClick={handleSubmit} className="btn-success">
              <Check className="w-5 h-5" />
              Publish Experiment
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateExperiment;