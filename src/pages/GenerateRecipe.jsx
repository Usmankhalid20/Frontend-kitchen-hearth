import { useState, useEffect } from 'react';
import { generateRecipe } from '../services/ai.service';
import { useAuthStore } from '../stores/authStore';
import { Loader2, ChefHat, Check, X, Sparkles } from 'lucide-react';

export default function GenerateRecipe() {
    const [prompt, setPrompt] = useState('');
    const [loading, setLoading] = useState(false);
    const [recipeData, setRecipeData] = useState(null);
    const [step, setStep] = useState('input'); // input, review, final
    const [error, setError] = useState('');
    const { user, fetchProfile } = useAuthStore();

    useEffect(() => {
        fetchProfile();
    }, [fetchProfile]);

    const aiGenerationsUsed = user?.aiGenerationCount || 0;
    const aiGenerationsTotal = 3;
    const creditsRemaining = Math.max(0, aiGenerationsTotal - aiGenerationsUsed);
    const hasCredits = creditsRemaining > 0;

    const handleGenerate = async (e) => {
        e.preventDefault();
        if (!prompt.trim() || !hasCredits) return;
        
        setLoading(true);
        setError('');
        
        try {
            const response = await generateRecipe(prompt);
            setRecipeData(response.data);
            await fetchProfile();
            setStep('review');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to generate recipe. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleConfirmIngredients = () => {
        setStep('final');
    };

    const handleRejectIngredients = () => {
        setRecipeData(null);
        setStep('input');
    };

    return (
        <div className="max-w-4xl mx-auto p-6 pt-24">
            <div className="text-center mb-4">
                <div className="flex items-center justify-center gap-3">
                    <ChefHat className="w-12 h-12 text-amber-500" />
                    <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">AI Recipe Generator</h1>
                </div>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Tell us what you're craving, what ingredients you have, or what dietary restrictions you follow, and we'll craft the perfect recipe for you.
                </p>
                
                <div className="flex justify-center mt-4">
                    <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-700 px-4 py-2 rounded-full border border-amber-200 shadow-sm font-medium">
                        <Sparkles className="w-4 h-4" />
                        <span>Credits Remaining: {creditsRemaining} / {aiGenerationsTotal}</span>
                    </div>
                </div>
            </div>

            {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
                    {error}
                </div>
            )}

            {step === 'input' && (
                <div className="bg-white text-black rounded-xl shadow-lg p-6">
                    <form onSubmit={handleGenerate}>
                        <label className="block text-gray-700 font-medium mb-2">
                            What would you like to make?
                        </label>
                        <textarea
                            className="w-full border border-gray-300 rounded-lg p-4 mb-4 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition"
                            rows="4"
                            placeholder="e.g., I want to make chicken tikka masala but with a healthy twist..."
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            disabled={loading || !hasCredits}
                        ></textarea>
                        
                        <button
                            type="submit"
                            disabled={loading || !prompt.trim() || !hasCredits}
                            className="w-full px-8 py-4 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-amber-500/30"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Generating...
                                </>
                            ) : (
                                <>
                                    <ChefHat className="w-5 h-5" />
                                    {hasCredits ? 'Generate Recipe' : 'Out of Credits'}
                                </>
                            )}
                        </button>
                    </form>
                    
                    {!hasCredits && (
                        <p className="mt-4 text-center text-red-500 text-sm font-medium">
                            You have reached your daily limit of 3 recipes. Please come back tomorrow!
                        </p>
                    )}
                </div>
            )}

            {step === 'review' && recipeData && (
                <div className="bg-white rounded-xl shadow-lg p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Review Ingredients</h2>
                    <p className="text-gray-600 mb-6">Here are the ingredients you'll need for <strong>{recipeData.title}</strong>. Do you have everything?</p>
                    
                    <ul className="space-y-3 mb-8">
                        {recipeData.ingredients.map((ingredient, idx) => (
                            <li key={idx} className="flex items-center text-gray-700 bg-gray-50 p-3 rounded-md">
                                <Check className="w-5 h-5 text-green-500 mr-3 shrink-0" />
                                <span>{ingredient}</span>
                            </li>
                        ))}
                    </ul>

                    <div className="flex gap-4">
                        <button
                            onClick={handleRejectIngredients}
                            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-lg transition flex items-center justify-center"
                        >
                            <X className="w-5 h-5 mr-2" />
                            Start Over
                        </button>
                        <button
                            onClick={handleConfirmIngredients}
                            className="flex-1 bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 px-6 rounded-lg transition flex items-center justify-center"
                        >
                            <Check className="w-5 h-5 mr-2" />
                            Looks Good!
                        </button>
                    </div>
                </div>
            )}

            {step === 'final' && recipeData && (
                <div className="bg-white rounded-xl shadow-lg p-8">
                    <div className="border-b pb-6 mb-6">
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">{recipeData.title}</h1>
                        <p className="text-gray-600 italic">{recipeData.description}</p>
                        
                        <div className="flex flex-wrap gap-4 mt-6">
                            <div className="bg-amber-50 text-amber-800 px-4 py-2 rounded-full font-medium text-sm">
                                Prep: {recipeData.prepTime}
                            </div>
                            <div className="bg-amber-50 text-amber-800 px-4 py-2 rounded-full font-medium text-sm">
                                Cook: {recipeData.cookTime}
                            </div>
                            <div className="bg-amber-50 text-amber-800 px-4 py-2 rounded-full font-medium text-sm">
                                Serves: {recipeData.servings}
                            </div>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="md:col-span-1 border-r pr-6">
                            <h2 className="text-xl font-bold text-gray-800 mb-4">Ingredients</h2>
                            <ul className="space-y-2">
                                {recipeData.ingredients.map((ingredient, idx) => (
                                    <li key={idx} className="text-gray-700 py-1 border-b border-gray-100 last:border-0">
                                        {ingredient}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        
                        <div className="md:col-span-2">
                            <h2 className="text-xl font-bold text-gray-800 mb-4">Instructions</h2>
                            <div className="space-y-6">
                                {recipeData.instructions.map((instruction, idx) => (
                                    <div key={idx} className="flex gap-4">
                                        <div className="shrink-0 w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center font-bold">
                                            {idx + 1}
                                        </div>
                                        <p className="text-gray-700 pt-1 leading-relaxed">
                                            {instruction}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    
                    <div className="mt-10 pt-6 border-t text-center">
                        <button
                            onClick={() => {
                                setRecipeData(null);
                                setStep('input');
                                setPrompt('');
                            }}
                            className="text-amber-600 hover:text-amber-700 font-medium"
                        >
                            Generate another recipe
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
